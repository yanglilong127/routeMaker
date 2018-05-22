//默认配置项

//cloud登录页面的地址
var login_url='/myroute/html/login.html';

//国际化语言名称简称
var countries={
    'Arabic':{
        'Bahrain':'ar.BH',
        'Algeria':'ar.DZ',
        'Egypt':'ar.EG',
        'Iraq':'ar.IQ',
        'Jordan':'ar.JO',
        'Kuwait':'ar.KW',
        'Lebanon':'ar.LB',
        'Libya':'ar.LY',
        'Morocco':'ar.MA',
        'Oman':'ar.OM',
        'Qatar':'ar.QA',
        'Saudi Arabia':'ar.SA',
        'Sudan':'ar.SD',
        'Syria':'ar.SY',
        'Tunisia':'ar.TN',
        'Yemen':'ar.YE',
    },
    'Belarus':{'Belarusian':'be.BY'},
    'Bulgaria':{'Bulgarian':'bg.BG'},
    'Spain':{'Catalan':'ca.ES'},
    'Czech Republic':{'Czech':'cs.CZ'},
    'Denmark':{'Danish':'da.DK'},
    'German':{
        'Austria':'de.AT',
        'Switzerland':'de.CH',
        'Germany':'de.DE',
        'Luxembourg':'de.LU',
    },
    'Greece':{'Greek':'el.GR'},
    'English':{
        'Australia':'en.AU',
        'Canada':'en.CA',
        'England':'en.GB',
        'Ireland':'en.IE',
        'new Zealand':'en.NZ',
        'United States':'en.US',
        'South Africa':'en.ZA',
    },
    'Spanish':{
        'Argentina':'es.AR',
        'Bolivia':'es.BO',
        'Chile':'es.CL',
        'Colombia':'es.CO',
        'Costa Rica':'es.CR',
        'Dominican Republic':'es.DO',
        'Ecuador':'es.EC',
        'Spain':'es.ES',
        'Guatemala':'es.GT',
        'Honduras':'es.HN',
        'Mexico':'es.MX',
        'Nicaragua':'es.NI',
        'Panama':'es.PA',
        'Peru':'es.PE',
        'Puerto Rico':'es.PR',
        'Paraguay':'es.PY',
        'El Salvador':'es.SV',
        'Uruguay':'es.UY',
        'Venezuela':'es.VE'
    },
    'Estonian':{'Estonia':'et.EE'},
    'Finnish':{'Finland':'fi.FI'},
    'French':{
        'Belgium':'fr.BE',
        'Canada':'fr.CA',
        'Switzerland':'fr.CH',
        'France':'fr.FR',
        'Luxembourg':'fr.LU',
    },
    'Croatian':{'Croatia':'hr.HR'},
    'Hungarian':{'Hungary':'hu.HU'},
    'Icelandic':{'Iceland':'is.IS'},
    'Italian':{
        'Switzerland':'it.CH',
        'Italy':'it.IT',
    },
    'Hebrew':{'Israel':'iw.IL'},
    'Japanese':{'Japan':'ja.JP'},
    'Korean':{'South Korea':'ko.KR'},
    'Lithuanian':{'Lithuania':'lt.LT'},
    'Latvian':{'Latvia':'lv.LV'},
    'Macedonian':{'Macedonia':'mk.MK'},
    'Dutch':{
        'Belgium':'nl.BE',
        'Netherlands':'nl.NL'
    },
    'Norwegian':{'Norway':'no.NO'},
    'Polish':{'Poland':'pl.PL'},
    'Portuguese':{
        'Brazil':'pt.BR',
        'Portugal':'pt.PT'
    },
    'Romanian':{'Romania':'ro.RO'},
    'Russian':{'Russia':'ru.RU'},
    'Cyprus-Croatian':{'Yugoslavia':'sr.YU'},
    'Swedish':{'Sweden':'sv.SE'},
    'Thai':{'Thailand':'th.TH'},
    'Turkish':{'Turkey':'tr.TR'},
    'Chinese':{
        'Simplified_CH':'zh.CN',
        'Traditional_CH':'zh.TW'
    },
    'Ukrainian':{'Ukraine':'uk.UA'}

};

var server_ip = 'www.burtyang.top:55566';  //服务区地址

module.exports={
    login_url,
    countries,
    server_ip
}