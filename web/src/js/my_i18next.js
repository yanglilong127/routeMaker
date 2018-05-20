import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

var default_language = 'en_US';  //默认语言
var language = localStorage.getItem('language');
if (language) {   //如果设置过了
    default_language = language;
    var choose_lang;  //选中的语言
    var short_name;
    if (language == 'en_US') {
        choose_lang = 'English';
        short_name= 'EN';
    }else if(language == 'zh_CN'){
        choose_lang = 'simplified_chinese';
        short_name= 'CN';
    }else{
        choose_lang = 'traditional_chinese';
        short_name= 'CN';
    }
    $('#navigation .language_setting a span.language')
    .data('i18n', choose_lang).attr('shortname', short_name);
}
i18next.use(XHR)
    .init({
        lng: default_language,  //设置当前翻译的语言
        debug: false,   //关闭debug模式
        whitelist: ['en_US', 'zh_CN', 'zh_TW'],   //允许的语言列表
        backend: {
            loadPath: '/myroute/locales/{{lng}}.json'
        }
    }, function (err, t) {
        // initialized and ready to go!
        updateContent();
    });

//监听语言更新,语言变化执行此函数
i18next.on('languageChanged', () => {
    updateContent();
});

function updateContent() {
    var $i18n = $('[data-i18n]');
    var i18n_lens = $i18n.length;
    for (let i = 0; i < i18n_lens; i++) {
        let i18n_val = $i18n.eq(i).data('i18n');
        i18n_val = i18next.t(i18n_val);
        var tagName = $i18n.eq(i).get(0).tagName;
        if (tagName == 'INPUT' || tagName == 'TEXTAREA') {  //针对input 和textarea框的默认显示
            $i18n.eq(i).attr('placeholder', i18n_val);
            var id_name = $i18n.eq(i).attr('id');
            if(id_name =='register1' || id_name=='login'){
                $i18n.eq(i).val(i18n_val);
            }
        } else {
            $i18n.eq(i).text(i18n_val);
        }
    }
};

//切换语言
$('#navigation .language_setting ul li').click(function (e) {
    e.stopPropagation();
    var lang = $(this).attr('val');
    var choose = $(this).data('i18n');
    var short_name = $(this).attr('shortname');
    $('#navigation .language_setting a span.language')
        .data('i18n', choose).attr('shortname', short_name);

    i18next.changeLanguage(lang);
    localStorage.setItem('language', lang);  //将所选语言存储在本地浏览器中
});