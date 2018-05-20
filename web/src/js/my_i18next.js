import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';

i18next.use(XHR)
.init({
    lng: 'en_US',  //设置当前翻译的语言
    debug: false,   //关闭debug模式
    whitelist: ['en_US','zh_CN','zh_TW'],   //允许的语言列表
    backend:{
        loadPath: '/myroute/locales/{{lng}}.json'
    }
}, function(err, t){
    // initialized and ready to go!
    updateContent();
});

//监听语言更新,语言变化执行此函数
i18next.on('languageChanged',()=>{
	updateContent();
});

function updateContent(){
    var $i18n=$('[data-i18n]');
    var i18n_lens=$i18n.length;
    for(let i=0; i<i18n_lens; i++){
        let i18n_val=$i18n.eq(i).data('i18n');
        i18n_val=i18next.t(i18n_val);
        var tagName= $i18n.eq(i).get(0).tagName;
        var id= $i18n.eq(i).attr('id');
        if(id=='login' || id=='register1'){
            $i18n.eq(i).attr('value',i18n_val);
        }else if(tagName=='INPUT' || tagName=='TEXTAREA'){  //针对input 和textarea框的默认显示
            $i18n.eq(i).attr('placeholder',i18n_val);
        }else{
            $i18n.eq(i).text(i18n_val);
        }
    }
};

//切换语言
$('#navigation .language_setting ul li').click(function(e){
    e.stopPropagation();
    var lang=$(this).attr('val');
    var choose = $(this).data('i18n');
    var short_name = $(this).attr('shortname');
    $('#navigation .language_setting a span.language')
    .data('i18n',choose).attr('shortname',short_name);

	i18next.changeLanguage(lang);
});