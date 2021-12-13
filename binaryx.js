const _$ = $.noConflict(true);

let BNB_PRICE = 1;
let BNX_PRICE = 1;
let GOLD_PRICE = 1;

const TOKEN_CODE_BNB = '1839';
const TOKEN_CODE_BNX = '9891';
const TOKEN_CODE_GOLD = '12082';
const TOKEN_CODES = [TOKEN_CODE_BNB, TOKEN_CODE_BNX, TOKEN_CODE_GOLD];

const Warrior = [0, 2,'Warrior'];
const Rogue   = [1, 0,'Rogue'];
const Mage    = [4, 5,'Mage'];
const Ranger  = [0, 1,'Ranger'];
const Classes = [Warrior, Rogue, Mage, Ranger];

const MINING_GOLD_MAPPING = { 0.0001: 0.06, 0.0002: 0.25, 0.0003: 0.56, 0.0004: 1, 0.0005: 1.56, 0.0006: 2.25, 0.0007: 3.06, 0.0008: 4, 0.0009: 5.06, 0.0010: 6.25, 0.0011: 7.56, 0.0012: 9, 0.0013: 10.56, 0.0014: 12.25, 0.0015: 14.06, 0.0016: 16, 0.0017: 18.06, 0.0018: 20.25, 0.0019: 22.56, 0.0020: 25, 0.0021: 27.56, 0.0022: 30.25, 0.0023: 33.06, 0.0024: 36, 0.0025: 39.06, 0.0026: 42.25, 0.0027: 45.56, 0.0028: 49, 0.0029: 52.56, 0.0030: 56.25, 0.0031: 60.06, 0.0032: 64, 0.0033: 68.06, 0.0034: 72.25, 0.0035: 76.56, 0.0036: 81, 0.0037: 85.56, 0.0038: 90.25, 0.0039: 95.06, 0.0040: 100, };
const MINING_GOLD_PER_DAY = 288;
let MINING_GOLD_RATE      = 100;
let MINING_GOLD_PRICES    = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(p=>p * MINING_GOLD_PER_DAY * MINING_GOLD_RATE / 100);



(function(window){
    window.BinaryX = {
        init() {
            BinaryX.ready(function(){
                ////Load Css
                //GM_xmlhttpRequest({
                //    url: 'https://raw.githubusercontent.com/Boritgoge/BinaryX/master/binaryx.css',
                //    method: 'GET',
                //    onload: function({response}){
                //        BinaryX.addStyle(response);
                //    }
                //});
//
                ////Load Html
                //GM_xmlhttpRequest({
                //    url: 'https://raw.githubusercontent.com/Boritgoge/BinaryX/master/binaryx.html',
                //    method: 'GET',
                //    onload: function({response}){
                //        BinaryX.addHtml(response);
                //    }
                //});
                BinaryX.loadApp();
            });
        },
        ready(callback) {
            _$(document).ready(function(){
                callback();
            });
        },
        addStyle(styles) {
            _$('head').append(`<style type="text/css">${styles}</style>`);
        },
        addHtml(html) {
            _$('body').append(html);
            BinaryX.loadApp();
        },
        loadApp(){
            const vm = new Vue({
                el: '#binaryx_popup',
                data() {
                    return {}
                },
                methods: {
                    loadPriceFromCoinMarketCap() {
                        GM_xmlhttpRequest({
                            url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + TOKEN_CODES.join() + '&convert=KRW',
                            headers: {
                                'X-CMC_PRO_API_KEY': REST_API_KEY
                            },
                            method: 'GET',
                            onload: ({ response }) => {
                                const tokens = JSON.parse(response).data;
                                BNB_PRICE = tokens[TOKEN_CODE_BNB].quote.KRW.price;
                                BNX_PRICE = tokens[TOKEN_CODE_BNX].quote.KRW.price;
                                GOLD_PRICE = tokens[TOKEN_CODE_GOLD].quote.KRW.price;

                                GM_xmlhttpRequest({
                                    url: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=' + TOKEN_CODE_GOLD + '&convert=BUSD',
                                    headers: {
                                        'X-CMC_PRO_API_KEY': REST_API_KEY
                                    },
                                    method: 'GET',
                                    onload: ({ response }) => {
                                        const tokens = JSON.parse(response).data;
                                        const goldPriceBUSD = tokens[TOKEN_CODE_GOLD].quote.BUSD.price;
                                        MINING_GOLD_RATE      = MINING_GOLD_MAPPING[Number(goldPriceBUSD.toFixed(4))];
                                        MINING_GOLD_PRICES    = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(p=>p * MINING_GOLD_PER_DAY * MINING_GOLD_RATE / 100);
                                    }
                                });
                            }
                        });
                    },
                    filtering(){
                        function isGood(name, attrs) {
                            return Classes.find(([mainAttrIdx, subAttrIdx, jobName]) => {
                                return name == jobName && attrs[mainAttrIdx] >= 86 && attrs[subAttrIdx] >= 61;
                            });
                        }
                        //레벨4 기준 ROI
                        function getROI(mainAttr, level, price, type) {
                            var lv2_up_gold = 20000;
                            var lv3_up_gold = 50000;
                            var lv4_up_gold = 150000;
                            let miningGold = MINING_GOLD_PRICES[mainAttr-86];
                            let levelUpPrice = 0;
                            if(level==1){
                                levelUpPrice = (lv2_up_gold + lv3_up_gold + lv4_up_gold) * GOLD_PRICE;
                            }else if(level==2){
                                levelUpPrice = (lv3_up_gold + lv4_up_gold) * GOLD_PRICE;
                            }else if(level>=3){
                                if(level == 3) {
                                    levelUpPrice = lv4_up_gold * GOLD_PRICE;
                                }
                            }
                    
                            miningGold = miningGold * Math.pow( 2 , 2);
                    
                            if(!type || type == 'bnx') {
                                return [(price * BNX_PRICE + levelUpPrice) / (miningGold * GOLD_PRICE), price * BNX_PRICE + levelUpPrice, miningGold]
                            }else{
                                return price / miningGold
                            }
                        }
                    
                        _$('.el-main--headerTitle').empty()
                            .append('<div>BNB: ' + String(BNB_PRICE.toFixed(2)).toLocaleString() + '원, BNX: ' + String(BNX_PRICE.toFixed(2)).toLocaleString() + '원, GOLD: ' + String(GOLD_PRICE.toFixed(2)).toLocaleString() + '원</div>')
                            .append('<div>Next Gold Rate: ' + MINING_GOLD_RATE + '% (매일 밤 9시 갱신)</div>');
                    
                        const $sales = _$('.crowdfund-list').find('.crowdfund-item');
                        $sales.each(function(){
                            const $sale = _$(this);
                            const $detail = $sale.find('.detail-cont');
                            const name = $detail.find('.tit .name').text();
                            const level = Number($detail.find('.tit .level').text().replace(/[^0-9]/g, ''));
                            const price = Number($detail.find('.tit .price').text().replace(/[^0-9.]/g, ''));
                            const attrs = [];
                            const $attrs = $detail.find('.attr-cont span').each(function(){
                                const $attr = _$(this);
                                if($attr.hasClass('n')) {
                                    attrs.push(Number($attr.text()));
                                }
                            });
                    
                            const good = isGood(name, attrs);
                            if(!good) {
                                $sale.remove();
                                return;
                            }
                    
                            const [mainAttrIdx, subAttrIdx] = good;
                    
                            $attrs.each(function(index){
                                const $attr = _$(this)
                                if($attr.hasClass('n')) {
                                    const realIdx = Math.floor(index / 2);
                                    if(realIdx == mainAttrIdx || realIdx == subAttrIdx) {
                                        $attr.css({color: 'red'});
                                    }
                                }
                            });
                    
                            const [ROI, totalPrice, miningGold] = getROI(attrs[mainAttrIdx], level, price);
                    
                            if(ROI > 200){
                                $sale.remove();
                                return;
                            }
                    
                            $sale.find('.img-box')
                                .empty()
                                .append('<div style="font-size:35px; margin-top: 5px; margin-left: 20px">ROI</div>')
                                .append('<div style="font-size:25px; margin-top: 5px; margin-left: 20px">#ROI#</div>'.replace('#ROI#', ROI.toFixed(2)))
                                .append('<div style="font-size:15px; margin-top: 5px; margin-left: 20px">-4렙기준-</div>')
                                .append('<div style="font-size:11px; margin-top: 5px; margin-left: 20px">채굴량(접시): ' + Math.floor(MINING_GOLD_PER_DAY * (MINING_GOLD_RATE / 100)) +' GOLD (' + (MINING_GOLD_PER_DAY * (MINING_GOLD_RATE / 100) * GOLD_PRICE).toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) + ')</div>')
                                .append('<div style="font-size:11px; margin-top: 5px; margin-left: 20px">채굴량(4렙): ' + Math.floor(miningGold).toLocaleString('ko-KR') +' GOLD (' + (miningGold * GOLD_PRICE).toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) + ')</div>')
                                .append('<div style="font-size:11px; margin-top: 5px; margin-left: 20px">원래가격: ' + price.toFixed(2) + ' BNX (' + (price * BNX_PRICE).toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) + ')</div>')
                                .append('<div style="font-size:11px; margin-top: 5px; margin-left: 20px">추가비용: ' + ((totalPrice / BNX_PRICE) - price).toFixed(2) + ' BNX (' + (((totalPrice / BNX_PRICE) - price) * BNX_PRICE).toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) + ')</div>')
                                .append('<div style="font-size:11px; margin-top: 5px; margin-left: 20px">전체비용: ' + (totalPrice / BNX_PRICE).toFixed(2) + ' BNX (' + totalPrice.toLocaleString( 'ko-KR', { style: 'currency', currency: 'KRW' } ) + ')</div>')
                            ;
                        });
                    }
                },
                mounted(){
                    setInterval(this.filtering, 500);
                }
            })
        }
    }
})(window);