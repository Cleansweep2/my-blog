function debounce(fun,time){
  let bs ;
  return function () {
    let _seif = this
    let args = arguments
    if(bs) clearTimeout(bs)
    bs = setTimeout(function () {
      fun.call(_seif,...args)
    },time)
  }
}

export const myMixin = {
  methods:{
    debounce,
  }
}

