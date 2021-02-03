/*!
* Lunr languages, `Chinese` language
* https://github.com/MihaiValentin/lunr-languages
*
* Copyright 2019, Felix Lian (repairearth)
* http://www.mozilla.org/MPL/
*//*!
* based on
* Snowball zhvaScript Library v0.3
* http://code.google.com/p/urim/
* http://snowball.tartarus.org/
*
* Copyright 2010, Oleg Mazko
* http://www.mozilla.org/MPL/
*/(function(root,factory){if(typeof define==='function'&&define.amd){define(factory)}else if(typeof exports==='object'){module.exports=factory()}else{factory()(root.lunr);}}(this,function(){return function(lunr){if('undefined'===typeof lunr){throw new Error('Lunr is not present. Please include / require Lunr before this script.');}
if('undefined'===typeof lunr.stemmerSupport){throw new Error('Lunr stemmer support is not present. Please include / require Lunr stemmer support before this script.');}
var isLunr2=lunr.version[0]=="2";lunr.zh=function(){this.pipeline.reset();this.pipeline.add(lunr.zh.trimmer,lunr.zh.stopWordFilter,lunr.zh.stemmer);if(isLunr2){this.tokenizer=lunr.zh.tokenizer;}else{if(lunr.tokenizer){lunr.tokenizer=lunr.zh.tokenizer;}
if(this.tokenizerFn){this.tokenizerFn=lunr.zh.tokenizer;}}};lunr.zh.tokenizer=function(obj){if(!arguments.length||obj==null||obj==undefined)return[]
if(Array.isArray(obj))return obj.map(function(t){return isLunr2?new lunr.Token(t.toLowerCase()):t.toLowerCase()})
var str=obj.toString().trim().toLowerCase();var tokens=[];lunr.segmentit&&lunr.segmentit.doSegment(str).forEach(function(seg){tokens=tokens.concat(seg.w.split(' '));});tokens=tokens.filter(function(token){return!!token;});var fromIndex=0
return tokens.map(function(token,index){if(isLunr2){var start=str.indexOf(token,fromIndex)
var tokenMetadata={}
tokenMetadata["position"]=[start,token.length]
tokenMetadata["index"]=index
fromIndex=start
return new lunr.Token(token,tokenMetadata);}else{return token}});}
lunr.zh.wordCharacters="\\w\u4e00-\u9fa5";lunr.zh.trimmer=lunr.trimmerSupport.generateTrimmer(lunr.zh.wordCharacters);lunr.Pipeline.registerFunction(lunr.zh.trimmer,'trimmer-zh');lunr.zh.stemmer=(function(){return function(word){return word;}})();lunr.Pipeline.registerFunction(lunr.zh.stemmer,'stemmer-zh');lunr.zh.stopWordFilter=lunr.generateStopWordFilter('的 一 不 在 人 有 是 為 以 於 上 他 而 後 之 來 及 了 因 下 可 到 由 這 與 也 此 但 並 個 其 已 無 小 我 們 起 最 再 今 去 好 只 又 或 很 亦 某 把 那 你 乃 它 吧 被 比 別 趁 當 從 到 得 打 凡 兒 爾 該 各 給 跟 和 何 還 即 幾 既 看 據 距 靠 啦 了 另 麼 每 們 嘛 拿 哪 那 您 憑 且 卻 讓 仍 啥 如 若 使 誰 雖 隨 同 所 她 哇 嗡 往 哪 些 向 沿 喲 用 於 咱 則 怎 曾 至 致 著 諸 自'.split(' '));lunr.Pipeline.registerFunction(lunr.zh.stopWordFilter,'stopWordFilter-zh');};}))