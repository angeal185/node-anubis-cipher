const crypto = require('crypto');



let roundKeyEnc = [],
roundKeyDec = [];

const utils = {
  rand: function(i){
    return crypto.randomBytes(i).toString('hex')
  },
  enc2hex: function(str){
		let i, l, o = '', n;
		str += '';

		for (i = 0, l = str.length; i < l; i++) {
			n = str.charCodeAt(i)
				 .toString(16);
			o += n.length < 2 ? '0' + n : n;
		}
		return o;
	},
  decHex: function(str){
		let bytes = [];
		for(var i=0; i< str.length-1; i+=2) bytes.push(parseInt(str.substr(i, 2), 16));
		return String.fromCharCode.apply(String, bytes);
	},
  substr: function(str, start, len) {
		let i = 0,
		allBMP = true,
		es = 0,
		el = 0,
		se = 0,
		ret = '';
		str += '';
		let end = str.length;

		if (start < 0) {
			start += end;
		}

		end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
		return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
	},
  ord: function(str) {
		let ch = str.charCodeAt(0);
		if (ch>0xFF) ch-=0x350;
		return ch;
	},
  mt_rand: function(min, max) {
		let argc = arguments.length;
		if (argc === 0) {
			min = 0;
			max = 2147483647;
		}
		else if (argc === 1) {
			throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
		}
		else {
			min = parseInt(min, 10);
			max = parseInt(max, 10);
		}
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},
  dPrep: function(data, append_block) {
		if(append_block == undefined) {
			append_block = true;
		}

		let blocks = [],
		blocks_count = Math.ceil(data.length / 16);

		for (var i = 0; i < blocks_count; i++) {
			blocks.push(data.substr(i * 16, 16));
		}

		if (append_block) {

			let block_len = 16;

			if (blocks.length > 0) {
				block_len = blocks[blocks_count - 1].length;
			}

			if (block_len == 16) {
				blocks.push('');
				block_len = 0;
				blocks_count++;
			}

			if (block_len < 16) {
				for (i = 0; i < 15 - block_len; i++) {
					blocks[blocks_count - 1] += String.fromCharCode(utils.mt_rand(0, 255));
				}
				blocks[blocks_count - 1] += String.fromCharCode(i + 1);
			}
		}

		return blocks;
	},
  hmac: function(secret, data, hash){
    const mac = crypto.createHmac(hash, secret).update(data).digest('hex')
    return mac;
  }


}

module.exports = utils;
