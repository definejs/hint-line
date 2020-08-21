

require('colors');

const Lines = require('@definejs/lines');


function seperate(order, length) {
    let prefixLen = order.toString().length;    //序号导致的额外长度。
    let len = prefixLen + length + 2;           //加 2，是因为：有1个长度是 ':'，还有1个是空格。
    let line = new Array(len).fill('-').join('');
    
    console.log(line.cyan);
}

module.exports = exports = {

    /**
    * 默认配置。 
    */
    defaults: require('./HintLine.defaults'),

    /**
    * 在控制台打印指定的片段，并高亮指定的行。
    * 已重载 hintline(lines, no, options);
    * 已重载 hintline(content, no, options);
    * 参数:
    *   lines: [] || '',        //内容行的数组。 或者直接传字符串内容，会先分裂成行数组。
    *   no: 99,                 //要高亮的行号。
    *   options = {             //可选。
    *       size: 10,           //高亮的行前后行数，作为上下文进行提示。
    *       color: 'gray',      //上下文的行的颜色。
    *       current: 'bgRed',   //高亮的行的颜色。
    *   };
    */
    highlight(lines, no, options) { 
        if (!Array.isArray(lines)) {
            lines = Lines.split(lines);
        }


        options = Object.assign({}, exports.defaults, options);

        let size = options.size;
        let begin = Math.max(no - size, 0);
        let end = Math.min(no + size + 1, lines.length);
        let list = lines.slice(begin, end);
        let max = Lines.maxLength(list);

        seperate(end, max.length);

        list.forEach(function (line, index) {
            let order = begin + index + 1;
            let color = options.color;

            order = order + ':';

            //当前要高亮的行。
            if (begin + index == no) {
                color = options.current;
                order = order.bgRed;
            }
            else {
                order = order.cyan;
            }

            console.log(order, line[color]);
        });

        seperate(end, max.length);

    },
};
