// ==UserScript==
// @name    BinaryX-Market-Script
// @include https://market.binaryx.pro/*
// @include http://market.binaryx.pro/*
// @include https://market-m.binaryx.pro/*
// @include http://market-m.binaryx.pro/*
// @include https://www.binaryx.pro/*
// @include http://www.binaryx.pro/*
// @require https://vuejs.org/js/vue.min.js
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require https://raw.githubusercontent.com/Boritgoge/BinaryX/master/binaryx.js
// @grant   GM_xmlhttpRequest
// @connect pro-api.coinmarketcap.com
// @connect raw.githubusercontent.com
// ==/UserScript==
//###################################################################################
//아래 값을 확인해주세요
//REST_API 키 발급받는 방법
//1. 코인마켓캡 가입하기(https://pro.coinmarketcap.com/)
//2. 코인마켓캡 대시보드에서 API Key 복사하기 (https://pro.coinmarketcap.com/account)
//3. 복사한 키값을 아래에 붙여넣기
const REST_API_KEY = '이곳에 API 키를 넣어주세요.';
//###################################################################################
BinaryX.init();