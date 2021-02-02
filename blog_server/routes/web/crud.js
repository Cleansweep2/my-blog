/**
 * web端的crud
 */
const koaRouter = require("koa-router");
const mongoose = require("mongoose");
//抛出异常
const { Exception } = require("../../core/http-exception");
//验证token
const { verifyToken } = require("../../Edittoken");
//转化类名
const inflection = require("inflection");
//路由前缀
const router = new koaRouter({
  prefix: "/web/crud",
});

/**
 * 任何后台的crud都要经过这歌路由
 */
router.use("/:model", async (ctx, next) => {
  const m = ctx.params.model;
  ctx.request.model = mongoose.model(inflection.capitalize(m));
  //加await就可以了 不加await 有的错误捕获不了
  await next();
});

//普通的crud
/**
 * 留言
 */
router.post("/comment/add", verify, async (ctx, next) => {
  const data = ctx.request.body;
  const model = ctx.request.model;
  try {
    await new model(data).save();
  } catch (err) {
    if (err) {
      throw new Exception("留言失败", global.config.FAIL);
    }
  }
  ctx.body = {
    success: "保存成功",
    errCode: global.config.SUCCESS,
  };
});
/**
 * 获取数据
 */
router.get("/:model/get", async (ctx, next) => {
  const m = ctx.params.model;
  const model = ctx.request.model;
  let data;
  if (m === "sentence") {
    //获取每日一句 //单独一句
    data = await model
      .find({})
      .sort({ createdAt: -1 })
      .populate({
        path: "blogger",
        select: {
          password: 0,
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);
  } else if (m === "tag") {
    data = await model.find({}).populate({
      path: "articleList",
      select: {
        content1: 0,
        content: 0,
      },
      populate: "category",
    });
  } else if (m === "info") {
    data = await model.findOne({ isShow: true });
  } else if (m === "diary") {
    data = await model.find({}).populate("author").sort({ createdAt: -1 });
  } else if (m === "course") {
    data = await model.find({}).sort({ start: -1 });
  } else if (m === "article") {
    data = await model
      .find({}, { content: 0, content1: 0 })
      .sort({ start: -1 });
  } else {
    data = await model.find({});
  }
  const total = data.length;
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
    total,
  };
});

//针对某一项特定的crud

/**
 * 获取图片 轮播图 或者美图
 */
router.get("/image/:localtion/get", async (ctx, next) => {
  const { localtion } = ctx.params;
  const { model } = ctx.request;
  let data;
  if (localtion === "首页") {
    data = await model.find({ localtion });
  } else if (localtion === "美图") {
    data = await model.aggregate([
      {
        $match: {
          localtion,
        },
      },
      {
        $group: {
          _id: "$author",
          images: {
            $push: {
              isCover: "$isCover",
              imgUrl: "$imgUrl",
              watch_num: "$watch_num",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
  }
  ctx.body = {
    data,
    errCode: global.config.SUCCESS,
    message: "请求成功",
  };
});
//图片观看数量加一
router.post("/image/watch/:author/update", async (ctx, next) => {
  const { author } = ctx.params;
  const { model } = ctx.request;
  await model.update(
    { localtion: "美图", author },
    { $inc: { watch_num: 1 } },
    { multi: true }
  );
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "更新成功",
  };
});

/**
 * 获取各分类文章列表
 * @id   _id
 * @page 页数
 */
router.get("/article/category/:id/:page/get", async (ctx, next) => {
  const { id, page } = ctx.params;
  const model = ctx.request.model;
  const skip = (page - 1) * 8;
  //支持分页功能
  const total = await model.find({ tags: id }).countDocuments();
  const data = await model
    .find({ tags: id }, { __v: 0, content: 0, content1: 0 })
    .populate("category")
    .skip(skip)
    .limit(8);
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
    total,
    curPage: page,
  };
});

/**
 * 获取文章归档 数量及时间 聚合
 */
router.get("/article/article_file_num/get", async (ctx, next) => {
  const model = ctx.request.model;
  const data = await model.aggregate([
    {
      $group: {
        _id: "$article_file",
        article_file: { $sum: 1 },
      },
    },
    {
      $sort: {
        _id: -1,
      },
    },
    {
      $limit: 10,
    },
  ]);
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 获取各文章归档的文章列表
 * @time 文章归档的时间
 */
router.get("/article/article_file/:time/:page/get", async (ctx, next) => {
  const model = ctx.request.model;
  const { time, page } = ctx.params;
  const skip = (page - 1) * 8;
  //支持分页功能
  const total = await model.find({ article_file: time }).countDocuments();

  const data = await model
    .find({ article_file: time }, { content: 0, content1: 0 })
    .skip(skip)
    .limit(8)
    .populate("category");
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
    total,
    curPage: page,
  };
});

/**
 * 获取各分类  按读的数量
 */
router.get("/:model/:id/recommend/get", async (ctx, next) => {
  const { model, id } = ctx.params;
  const m = ctx.request.model;
  let data;
  if (model === "article") {
    data = await m.find({ tags: id }).sort({ read_num: -1 }).limit(5);
  } else if (model === "article_file") {
    data = await m
      .find({ article_file: id }, { content: 0, content1: 0 })
      .sort({ read_num: -1 })
      .limit(5);
  }
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 获取首页文章 博主推荐
 */
router.get("/article/recommend/get", async (ctx, next) => {
  const m = ctx.request.model;
  data = await m
    .find({ isRecommend: true }, { content: 0, content1: 0 })
    .populate("category")
    .sort({ favor: -1 })
    .limit(4);
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 获取文章的排行  文章排行
 */
router.get("/article/ranking/get", async (ctx, next) => {
  const model = ctx.request.model;
  const data = await model
    .find({})
    .sort({ read_num: -1 })
    .select({
      content1: 0,
      content: 0,
    })
    .limit(5);
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 获取最新文章
 * 因为实现下拉加载功能所以得分页
 */
router.get("/article/new/:page/get", async (ctx, next) => {
  const { page } = ctx.params;
  const model = ctx.request.model;
  const skip = (page - 1) * 8;
  //支持分页功能
  const total = await model.find({}).countDocuments();
  const data = await model
    .find({})
    .populate("category")
    .select({
      content1: 0,
      content: 0,
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(8);
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
    total,
    curPage: page - 0,
  };
});

/**
 * 获取文章数量,评论数量
 */
router.get("/:model/count/get", async (ctx) => {
  const model = ctx.request.model;
  const count = await model.find({}).countDocuments();
  ctx.body = {
    count,
    errCode: global.config.SUCCESS,
    message: "请求成功",
  };
});

/**
 * 获取文章详情
 */
router.get("/article/article_detail/:id/get", async (ctx, next) => {
  const { id } = ctx.params;
  const model = ctx.request.model;
  const data = await model.findById(id).populate("category");
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 文章方面 阅读的数量 加一....
 */
router.post("/article/read/:id/update", async (ctx, next) => {
  const { id } = ctx.params;
  const model = ctx.request.model;
  await model.findByIdAndUpdate(id, { $inc: { read_num: 1 } });
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "更新成功",
  };
});

/**
 * 文章点赞数量加一
 */
router.post(
  "/article/favor/:article/:user/update",
  verify,
  async (ctx, next) => {
    const { article, user } = ctx.params;
    const Article = ctx.request.model;
    const Favor = mongoose.model("Favor");
    //先查找该用户有没有对文章点赞
    const res = await Favor.findOne({ article });
    let message;
    if (!res) {
      //没有事务处理 这边并发时有点危险
      await Favor({ article, user }).save();
      await Article.findByIdAndUpdate(article, { $inc: { favor: 1 } });
      message = "点赞成功";
    } else {
      await Favor.deleteOne({ article });
      await Article.findByIdAndUpdate(article, { $inc: { favor: -1 } });
      message = "已取消点赞";
    }
    ctx.body = {
      errCode: global.config.SUCCESS,
      message,
    };
  }
);

/**
 * 查找文章点赞情况
 */
router.get("/article/favor/:article/get", async (ctx, next) => {
  const { article } = ctx.params;
  const Favor = mongoose.model("Favor");
  const favor = await Favor.find({ article }).countDocuments();
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "获取成功",
    favor,
  };
});

/**
 * 查找用户点赞情况 该用户是否点赞
 */
router.get("/article/favor/:article/:user/get", async (ctx, next) => {
  const { article, user } = ctx.params;
  const Favor = mongoose.model("Favor");
  const favor = await Favor.findOne({ article, user });
  let is_favor = 1; //没有点赞
  if (favor) {
    is_favor = 0; //点赞了
  }
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "获取成功",
    is_favor,
  };
});

/**
 * 获取最新评论 留言评论 以及文章评论
 */
router.get("/comment/:type/get", async (ctx, next) => {
  const { type } = ctx.params;
  const model = ctx.request.model;
  let data;
  //最新评论 主页
  if (type === "new") {
    data = await model
      .find({ to: { $exists: false } })
      .populate({
        path: "publisher",
        select: {
          __v: 0,
        },
      })
      .sort({ createdAt: -1 })
      .limit(5);
    //留言 主页 以及个人评论
  } else {
    data = await model
      .find({ to: { $exists: false }, localtion: type })
      .populate("publisher")
      .populate({
        path: "froms",
        //查询子评论的user
        populate: {
          path: "publisher froms",
          select: { password: 0 },
          populate: {
            //查询子子评论的user
            path: "publisher",
            select: { password: 0 },
          },
        },
      })
      .sort({ createdAt: -1 });
  }
  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 获取每个文章的评论
 */
router.get("/comment/article/:id/get", async (ctx) => {
  const { id } = ctx.params;
  const model = ctx.request.model;
  const data = await model
    .find({ article: id, to: { $exists: false } })
    .populate("publisher")
    .populate({
      path: "froms",
      //查询子评论的user
      populate: {
        path: "publisher froms",
        select: { password: 0 },
        populate: {
          //查询子子评论的user
          path: "publisher",
          select: { password: 0 },
        },
      },
    })
    .sort({ createdAt: -1 });

  ctx.body = {
    errCode: global.config.SUCCESS,
    message: "请求成功",
    data,
  };
});

/**
 * 搜索功能的实现
 * @keyword 关键字
 */
router.get("/article/:keyword/:page/search", async (ctx) => {
  const model = ctx.request.model;
  const { keyword, page } = ctx.params;
  const skip = (page - 1) * 8;
  const regex = new RegExp(keyword, "i");
  const total = await model.find({ title: { $regex: regex } }).countDocuments();
  const data = await model
    .find({ title: { $regex: regex } }, { content: 0, content1: 0 })
    .skip(skip)
    .limit(8);
  ctx.body = {
    currentPage: page,
    data,
    total,
    errCode: global.config.SUCCESS,
    message: "请求成功",
  };
});

/**
 * 用作点赞和评论 评论的路由验证
 */
async function verify(ctx, next) {
  //留言也需要进行一次身份的验证,防止恶意留言
  const { token } = ctx.headers;
  if (!token) {
    throw new Exception("请先登录", global.config.NOTUSER);
  }
  const user = await verifyToken(token);
  if (!user) {
    throw new Exception("请重新登录", global.config.NOTUSER);
  }
  await next();
}

module.exports = router;
