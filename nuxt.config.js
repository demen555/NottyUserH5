const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  telemetry: false,
  dev: process.env.NODE_ENV === "development",
  vue: {
    config: {
      productionTip: true,
      devtools: true
    }
  },
  ssr: true,
  router: {
    middleware: 'redirect'
  },
  hooks: {
    'render:route': (url, result) => {
      result.html = result.html.replace(/data-n-head=\"ssr\"/gi,'')
    }
  },
  head: {
    title: 'Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube | Nottyhub.com',
    htmlAttrs: {
      lang: 'en'
    },

    script: [
      {
        src: "https://www.googletagmanager.com/gtag/js",
        mode: 'client'
      },
      {
        src: "/js/DPlayer.min.js",
        mode: 'client'
      },
      {
        src: "/js/hls.min.js",
        mode: 'client'
      },
      {
        src: "https://a.exoclick.com/tag_gen.js",
        'data-goal': "1748fdaba3d5f04bb0082c086621ebc9",
        'data-value': "{conversion_value}",
        type: "application/javascript",
        mode: 'client'
      },
      {
        charset: 'UTF-8',
        id: 'LA_COLLECT',
        src: '//sdk.51.la/js-sdk-pro.min.js',
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(
          {
          
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Assistir Vídeo Pornô Grátis HD | XXX Filmes de Sexo Porno | Porno Tube by Nottyhub.com",
            "brand":"Nottyhub XXX Video",
            "image": "https://nottyhub.com/linklogo/ic_launcher36x36.png",
            "mainentityofpage":"https://nottyhub.com/",
            "description":"Nottyhub, assista a Vídeos Pornôs Grátis em HD agora! Obtenha filmes e clipes pornôs diários XXX. Melhor Tube Pornô para Brasileiro! Apresentando pornografia gay, pornografia lésbica, vídeo amador caseiro!",
            "@id": "https://nottyhub.com/",
            "url": "https://nottyhub.com/",
            "telephone": "60 11-13267610",
            "priceRange": "$",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Rua 18 467, Anápolis, Goiás 75095-010, Brazil",
              "addressLocality": "Goiás",
              "postalCode": "75095-010",
              "addressCountry": "Brazil"
            },
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday"
              ],
              "opens": "00:00",
              "closes": "23:59"
            },
            "sameAs": [
              "https://twitter.com/nottyhubcom",
              "https://www.reddit.com/user/nottyhub",
              "https://500px.com/p/nottyhub",
              "https://www.flickr.com/people/nottyhub/",
              "https://www.youtube.com/@nottyhubcom",
              "https://flipboard.com/@nottyhub",
              "https://sites.google.com/view/nottyhub",
              "https://www.tumblr.com/nottyhub",
              "https://nottyhub.mystrikingly.com/",
              "https://nottyhubcom.blogspot.com/",
              "https://social.msdn.microsoft.com/Profile/nottyhub",
              "https://wakelet.com/@nottyhub",
              "https://glose.com/u/nottyhub",
              "https://www.pinterest.com/nottyhub/",
              "https://gravatar.com/nottyhubcom",
              "https://www.blogger.com/profile/16557746120632602951",
              "https://www.deviantart.com/nottyhub",
              "https://issuu.com/nottyhub",
              "https://nottyhub.webflow.io/",
              "https://about.me/nottyhub",
              "https://tinhte.vn/profile/nottyhub.3004058/",
              "https://www.anobii.com/fr/01cb36915450bed0fe/profile/activity",
              "https://research.openhumans.org/member/nottyhub/",
              "https://hackerone.com/nottyhub",
              "https://glints.com/vn/profile/public/f122d2b8-172d-4b46-8c86-5ac06a6f8ab0",
              "https://www.awwwards.com/nottyhub/",
              "https://www.hahalolo.com/@658f7b930694371ea48daa70",
              "https://codepen.io/nottyhub",
              "https://code.datasciencedojo.com/nottyhubcom",
              "https://band.us/band/93392227/intro",
              "https://www.twitch.tv/nottyhub/about",
              "https://groups.google.com/g/nottyhub/c/_rBGTsHH-Kg",
              "https://ameblo.jp/nottyhub/",
              "https://www.scoop.it/u/nottyhub",
              "https://www.diigo.com/profile/nottyhub",
              "https://nottyhub.gitbook.io/nottyhub/",
              "https://nottyhub.shopinfo.jp/posts/50925257",
              "https://hub.docker.com/u/nottyhub",
              "https://fliphtml5.com/homepage/centi",
              "https://www.walkscore.com/people/222618326285/nottyhub",
              "https://lab.quickbox.io/nottyhub",
              "https://camp-fire.jp/profile/nottyhub",
              "https://my.archdaily.com/us/@nottyhub",
              "https://qiita.com/nottyhub",
              "https://anyflip.com/homepage/cyego",
              "https://www.lawyersclubindia.com/profile.asp?member_id=1011870",
              "https://pubhtml5.com/homepage/taxwl/",
              "https://www.zotero.org/nottyhub/cv",
              "https://gitlab.aicrowd.com/nottyhub",
              "https://micro.blog/nottyhub",
              "https://www.credly.com/users/nottyhub/badges",
              "https://os.mbed.com/users/nottyhub/",
              "https://influence.co/nottyhub",
              "https://www.speedrun.com/users/nottyhub",
              "https://www.catchafire.org/profiles/2653762/",
              "https://hitrecord.org/users/nottyhub/records",
              "https://app.roll20.net/users/12801812/nottyhub",
              "https://www.free-ebooks.net/profile/1527611/nottyhub",
              "https://www.producthunt.com/@nottyhub",
              "https://www.goodreads.com/nottyhub",
              "https://www.warriorforum.com/members/nottyhub.html",
              "https://osf.io/7twdx/",
              "http://egamingsupply.com/forum/member.php/66168-nottyhub",
              "https://archive.org/details/@nottyhub",
              "https://worldcosplay.net/member/1695480",
              "https://www.midi.org/forum/profile/152978-nottyhub",
              "https://www.renderosity.com/users/id:1437558",
              "https://forums.ccbluex.net/user/nottyhub",
              "https://www.dermandar.com/user/nottyhub/",
              "https://club.doctissimo.fr/nottyhub/",
              "https://www.youmagine.com/nottyhub/designs",
              "https://keymander.iogear.com/profile/74829/nottyhub",
              "https://heylink.me/nottyhub/",
              "https://www.bandlab.com/nottyhub",
              "https://profile.hatena.ne.jp/nottyhub/",
              "https://portfolium.com/nottyhubcom",
              "https://favinks.com/profile/nottyhub",
              "http://freestyler.ws/user/428448/nottyhub",
              "https://topsitenet.com/profile/nottyhub/1108263/",
              "https://www.callupcontact.com/b/businessprofile/nottyhub/8848331",
              "https://writeablog.net/nottyhub/nottyhub",
              "https://zenwriting.net/nottyhub/nottyhub",
              "http://www.fanart-central.net/user/nottyhub/profile",
              "https://www.quia.com/profiles/nottyhub",
              "https://justpaste.it/u/nottyhub",
              "https://www.fimfiction.net/user/674518/nottyhub",
              "https://artmight.com/user/profile/3591159",
              "https://wmart.kz/forum/user/143377/",
              "https://mastodon.online/@nottyhub",
              "https://www.aicrowd.com/participants/nottyhub",
              "https://www.robot-forum.com/user/140987-nottyhub/",
              "https://snowie.com/forums/users/nottyhubcom/",
              "https://doodleordie.com/profile/nottyhub",
              "https://eternagame.org/players/348061",
              "https://pastelink.net/c505ra7o",
              "https://rentry.co/nottyhub",
              "https://allmylinks.com/nottyhubcom",
              "http://ttlink.com/nottyhub",
              "https://ingmac.ru/forum/?PAGE_NAME=profile_view&UID=34479",
              "https://commiss.io/nottyhub",
              "http://vetstate.ru/forum/?PAGE_NAME=profile_view&UID=99326",
              "https://jsfiddle.net/nottyhub/sfbe4cu7/",
              "https://www.mixcloud.com/nottyhub/",
              "http://molbiol.ru/forums/index.php?showuser=1317689",
              "https://shoplook.io/profile/nottyhub",
              "https://www.veoh.com/users/nottyhub",
              "https://files.fm/nottyhub/info",
              "https://vnvista.com/forums/member130434.html",
              "https://www.gta5-mods.com/users/nottyhub",
              "https://public.sitejot.com/nottyhub.html",
              "https://telegra.ph/nottyhub-12-30",
              "https://answerpail.com/index.php/user/nottyhub",
              "http://www.stwx.net/space-uid-5906070.html",
              "https://experiment.com/users/nottyhub",
              "https://www.facer.io/u/nottyhub",
              "https://hvacr.vn/diendan/members/nottyhub.164562/#about",
              "https://www.myminifactory.com/users/nottyhub",
              "https://www.minagricultura.gov.co/Lists/EncuestaPercepcion20171/DispForm.aspx?ID=5294&Source=https%3A%2F%2Fwww%2Eminagricultura%2Egov%2Eco%2FLists%2FEncuestaPercepcion20171%2FAllItems%2Easpx%23InplviewHash7ea49b3f%2D3393%2D4ecf%2Da03d%2Dfe0baed67fee%3DSortField%253DModified%2DSortDir%253DDesc",
              "https://nottyhub.gallery.ru/",
              "https://www.magcloud.com/user/nottyhub",
              "https://fileforum.com/profile/nottyhub",
              "https://tupalo.com/en/users/5983314",
              "https://controlc.com/56fe3ea7",
              "https://myanimeshelf.com/profile/nottyhub",
              "https://anantsoch.com/members/nottyhub/profile/",
              "https://www.360cities.net/profile/nottyhub",
              "https://www.notebook.ai/@nottyhub",
              "https://www.hogwartsishere.com/1593687/",
              "https://pbase.com/nottyhub",
              "https://muut.com/mikipoker#!/general:assistir-video-porno-gratis",
              "https://joy.link/nottyhub",
              "https://coub.com/nottyhub",
              "https://forum.index.hu/User/UserDescription?u=1975064",
              "https://communities.bentley.com/members/9ba96236_2d00_afd7_2d00_4904_2d00_9950_2d00_735af255a8e9",
              "https://xxxvideonottyhub.website3.me/",
              "https://www.instapaper.com/p/13620961",
              "https://hashnode.com/@nottyhub",
              "https://pandoraopen.ru/author/nottyhub/",
              "https://www.ohay.tv/profile/nottyhub",
              "https://www.babelcube.com/user/xxx-video-nottyhub",
              "https://www.nintendo-master.com/profil/nottyhub",
              "https://profile.ameba.jp/ameba/nottyhub",
              "https://www.reverbnation.com/artist/nottyhub",
              "https://sketchfab.com/nottyhub",
              "https://onlyfans.com/nottyhub",
              "https://tvchrist.ning.com/profile/nottyhub",
              "https://community.fabric.microsoft.com/t5/user/viewprofilepage/user-id/667340",
              "https://qna.habr.com/user/nottyhub",
              "https://chart-studio.plotly.com/~nottyhub",
              "https://pxhere.com/en/photographer/4154588",
              "https://wefunder.com/nottyhub",
              "https://www.intensedebate.com/profiles/nottyhubcom",
              "https://newspicks.com/user/9753134",
              "https://www.wpgmaps.com/forums/users/nottyhub/",
              "https://www.designspiration.com/nottyhub/saves/",
              "https://app.net/profile/nottyhub",
              "https://musescore.com/user/76093282/sets/7092178",
              "https://www.cakeresume.com/me/nottyhub",
              "https://artistecard.com/nottyhub",
              "https://hypothes.is/users/nottyhub",
              "https://blip.fm/nottyhub",
              "https://ioby.org/users/nottyhubcom753693",
              "https://app.talkshoe.com/user/nottyhub",
              "https://velog.io/@nottyhub/about",
              "https://qooh.me/nottyhub",
              "https://bikeindex.org/users/nottyhub",
              "https://community.windy.com/user/nottyhub",
              "https://vocal.media/authors/nottyhub",
              "https://www.adsoftheworld.com/users/c2af5204-de56-4239-9165-2d7faef6652e",
              "https://www.metal-archives.com/users/nottyhub",
              "https://www.graphis.com/bio/xxx-video-nottyhub/",
              "https://www.giveawayoftheday.com/forums/profile/159138",
              "https://allmyfaves.com/nottyhub",
              "https://inkbunny.net/nottyhub",
              "https://www.projectnoah.org/users/nottyhubcom",
              "http://sqworl.com/8mu84e",
              "https://lazi.vn/user/nottyhub.video",
              "https://gitee.com/nottyhubcom",
              "https://taplink.cc/nottyhub",
              "https://www.plurk.com/nottyhub",
              "https://www.silverstripe.org/ForumMemberProfile/show/128128",
              "http://users.atw.hu/tuleles/phpBB2/profile.php?mode=viewprofile&u=23230",
              "https://gitlab.freedesktop.org/nottyhub",
              "https://forums.gta5-mods.com/user/nottyhub",
              "https://uxfol.io/032dbd7a",
              "https://www.bitsdujour.com/profiles/AFcKDI",
              "https://www.curioos.com/nottyhub",
              "https://www.multichain.com/qa/user/nottyhub",
              "http://bbs.01bim.com/home.php?mod=space&uid=351936",
              "https://www.checkli.com/nottyhub",
              "https://www.exchangle.com/nottyhub",
              "https://ourairports.com/members/nottyhub/",
              "https://www.vevioz.com/setting/nottyhub",
              "https://www.arabnet.me/english/startups/nottyhub",
              "https://edshelf.com/profile/nottyhub",
              "http://www.travelful.net/location/5344187/brazil/nottyhub",
              "https://www.bibrave.com/users/231221",
              "https://www.funddreamer.com/users/nottyhub",
              "http://riosabeloco.com/User-Profile/userId/215279",
              "https://www.metooo.it/u/nottyhub",
              "https://gitlab.pavlovia.org/nottyhub",
              "https://www.ethiovisit.com/myplace/nottyhub",
              "https://www.allsquaregolf.com/golf-users/xxx-video-nottyhub",
              "http://mysmarterhome.ca/UserProfile/tabid/42/userId/78284/Default.aspx",
              "https://eatsleepride.com/rider/nottyhub",
              "https://tudomuaban.com/chi-tiet-rao-vat/2002330/xxx-video-nottyhub.html",
              "https://velopiter.spb.ru/profile/103890-nottyhub/?tab=field_core_pfield_1",
              "https://blog.b92.net/user/247283/nottyhub/",
              "https://www.weddingbee.com/members/nottyhub/",
              "https://www.divephotoguide.com/user/nottyhub",
              "https://yolotheme.com/forums/users/nottyhub/",
              "https://scrapbox.io/nottyhub/XXX_Video_Nottyhub",
              "https://bimber.bringthepixel.com/main/buddypress/members/xxxvideonottyhub/profile/",
              "https://start.me/p/E5JQrw/nottyhub",
              "https://www.bigbasstabs.com/profile/76184.html",
              "https://developmentmi.com/author/nottyhub/",
              "https://starcourts.com/author/nottyhub/",
              "https://offcourse.co/users/profile/nottyhub",
              "https://www.hivizsights.com/forums/users/nottyhubcom/",
              "https://agoracom.com/members/nottyhub",
              "https://articlement.com/author/nottyhub-47824/",
              "https://willysforsale.com/author/nottyhub/",
              "http://foxsheets.com/UserProfile/tabid/57/userId/166796/Default.aspx",
              "https://py.checkio.org/class/demo-class-nottyhub/",
              "https://js.checkio.org/class/demo-class-nottyhub/",
              "https://www.servinord.com/phpBB2/profile.php?mode=viewprofile&u=566077",
              "http://sciencemission.com/site/index.php?page=members&type=view&id=nottyhub&utheme=bootstrap",
              "https://chillspot1.com/user/nottyhub",
              "https://www.foroatletismo.com/foro/members/nottyhub.html",
              "http://winnipeg.pinklink.ca/author/nottyhub/",
              "https://heavenarticle.com/author/nottyhub-25738/",
              "https://webarticleservices.com/members/nottyhub/",
              "https://webranksite.com/author/nottyhub-49455/",
              "http://nottyhub.fresh.li/",
              "https://writexo.com/nottyhub",
              "http://test.sozapag.ru/forum/user/218373/",
              "https://www.heroesfire.com/profile/nottyhub/bio",
              "http://www.so0912.com/home.php?mod=space&uid=2032967",
              "http://www.disonde.com/jishu/bbs/home.php?mod=space&uid=1204586",
              "https://thearticlesdirectory.co.uk/members/nottyhubcom/",
              "https://popularticles.com/members/nottyhub/",
              "https://www.okaywan.com/home.php?mod=space&uid=497721",
              "https://articledirectoryproject.com/members/nottyhub/",
              "https://electrodb.ro/forums/users/nottyhub/",
              "https://matkafasi.com/user/nottyhub",
              "https://studynotes.ie/user/nottyhub",
              "https://bbs.lineagem.shop/home.php?mod=space&uid=2342277",
              "https://www.dokkan-battle.fr/forums/users/nottyhub/",
              "https://gitlab.vuhdo.io/nottyhub",
              "https://glamorouslengths.com/author/nottyhub/",
              "http://compcar.ru/forum/member.php?u=102770",
              "https://cryptomonnaies.me/user/nottyhub",
              "https://www.iglinks.io/nottyhubcom-ots?preview=true",
              "https://www.homepokergames.com/vbforum/member.php?u=91143",
              "https://hukukevi.net/user/nottyhub",
              "https://hangoutshelp.net/user/nottyhub",
              "https://www.vid419.com/space-uid-3080533.html",
              "http://l-avt.ru/support/dialog/?PAGE_NAME=profile_view&UID=60785&backurl=%2Fsupport%2Fdialog%2F%3FPAGE_NAME%3Dprofile_view%26UID%3D58936",
              "https://kowabana.jp/users/113011",
              "https://pythondevs.social/nottyhub",
              "https://www.itchyforum.com/en/member.php?283292-nottyhub",
              "https://community.arlo.com/t5/user/viewprofilepage/user-id/940609",
              "http://www.invelos.com/UserProfile.aspx?alias=nottyhub",
              "https://b.hatena.ne.jp/nottyhub/bookmark",
              "https://www.bark.com/en/ca/company/xxx-video-nottyhub/0ypoz/",
              "https://www.furaffinity.net/user/nottyhub/",
              "https://notabug.org/nottyhub",
              "http://www.askmap.net/location/6791586/brazil/xxx-video-nottyhub",
              "https://able2know.org/user/nottyhub/",
              "https://leetcode.com/nottyhub/",
              "https://socialtrain.stage.lithium.com/t5/user/viewprofilepage/user-id/37020",
              "https://community.alteryx.com/t5/user/viewprofilepage/user-id/532433",
              "https://www.storeboard.com/xxxvideonottyhub",
              "https://www.vbulletin.org/forum/member.php?u=573830",
              "http://choigo88bz.crowdfundhq.com/users/nottyhub",
              "https://opentutorials.org/profile/149730",
              "http://www.freeok.cn/home.php?mod=space&uid=4705510",
              "http://www.elektroenergetika.si/UserProfile/tabid/43/userId/877829/Default.aspx",
              "https://phenomenalarticles.com/members/nottyhub/",
              "https://muckrack.com/nottyhub-com/bio",
              "https://readthedocs.org/projects/nottyhub/",
              "https://developer.tobii.com/community-forums/members/nottyhub/",
              "https://orcid.org/0009-0003-2487-8811",
              "https://audiomack.com/nottyhub",
              "https://jobs.newtimes.co.rw/employers/2641533-xxx-video-nottyhub",
              "https://graphcommons.com/u/nottyhub?f=member",
              "https://circleten.org/a/266981",
              "https://www.hd.club.tw/space-uid-2962347.html",
              "https://xtremepape.rs/members/nottyhub.427362/#about",
              "https://www.dotafire.com/profile/nottyhub-112264?profilepage",
              "http://delphi.larsbo.org/user/nottyhub",
              "http://forumsg.pl/member.php?action=profile&uid=27562",
              "https://www.mindmeister.com/app/map/3098921612?t=hk0LvAQO6E",
              "https://comicvine.gamespot.com/profile/nottyhub/",
              "https://twitback.com/nottyhub",
              "https://connect.gt/user/nottyhub",
              "https://beermapping.com/account/nottyhub",
              "http://www.ctump.edu.vn/Default.aspx?tabid=115&userId=18361",
              "https://www.fitday.com/fitness/forums/members/nottyhub.html",
              "https://guides.co/a/xxx-video-nottyhub/",
              "http://maisoncarlos.com/UserProfile/tabid/42/userId/1841232/Default.aspx",
              "https://globalarticlefinder.com/members/nottyhub/",
              "https://articlessubmissionservice.com/members/nottyhub/",
              "https://shootinfo.com/profile/?updated=true",
              "https://apk.tw/space-uid-6070846.html",
              "https://richs5star.breakawayiris.com/ActivityFeed/MyProfile/tabid/749/UserId/537130/Default.aspx",
              "https://click4r.com/posts/g/13838668/",
              "http://hawkee.com/profile/5804340/",
              "https://stocktwits.com/nottyhub",
              "http://buildolution.com/UserProfile/tabid/131/userId/383943/Default.aspx",
              "https://forum.m5stack.com/user/nottyhub",
              "https://globalcatalog.com/xxxvideonottyhub.vn",
              "https://hiqy.in/nottyhub",
              "https://www.myvidster.com/profile/nottyhub",
              "https://www.iniuria.us/forum/member.php?400293-nottyhub",
              "https://us.enrollbusiness.com/BusinessProfile/6511773/nottyhub",
              "https://blog.ulifestyle.com.hk/nottyhub",
              "https://booklog.jp/users/nottyhub/profile",
              "https://m1bar.com/user/nottyhub/",
              "https://www.opendrive.com/file/MjJfMjM1MjE3Nzhfb1pha3o",
              "https://www.espace-recettes.fr/profile/nottyhubc/647807",
              "https://www.fmscout.com/users/nottyhub.html",
              "https://www.outdoorproject.com/users/xxx-video-nottyhub",
              "https://zumvu.com/nottyhub/",
              "https://www.99freelas.com.br/user/nottyhub",
              "https://nhattao.com/members/user6374174.6374174/",
              "https://rotorbuilds.com/profile/28947/",
              "https://www.clickasnap.com/profile/nottyhub",
              "https://www.guilded.gg/u/nottyhub",
              "https://www.litteratureaudio.com/membre/nottyhub/profil",
              "https://www.mountainproject.com/user/201727394/xxx-video-nottyhub",
              "https://www.mtg-forum.de/user/66516-nottyhub/",
              "https://www.pixilart.com/nottyhub/about",
              "https://www.playping.com/nottyhub",
              "https://www.40billion.com/profile/805028949",
              "https://www.laonsw.net/web/nottyhub/",
              "https://solorider.com/forums/users/nottyhub",
              "https://schoolido.lu/user/nottyhub/",
              "https://doselect.com/@nottyhub",
              "https://www.naucmese.cz/xxx-video-nottyhub?_fid=3ocs",
              "https://www.inflearn.com/users/1313659",
              "https://storyweaver.org.in/en/users/878588?bookShelf",
              "https://www.hikingproject.com/user/201727394/xxx-video-nottyhub",
              "https://www.flyingsolo.com.au/members/nottyhub/profile/",
              "https://open.firstory.me/user/clqri0uok06t301tn4hf304mt",
              "https://grupoperuinnova.edu.pe/members/nottyhub/activity/66979/",
              "https://www.sythe.org/members/nottyhub.1659479/",
              "https://iot.ttu.edu.tw/members/nottyhub/profile/",
              "https://timdaily.vn/members/nottyhub.82009/#about",
              "https://f319.com/members/nottyhub.829625/",
              "https://git.metabarcoding.org/nottyhubcom",
              "https://roomstyler.com/users/nottyhub",
              "https://gifyu.com/nottyhub",
              "https://www.mapleprimes.com/users/nottyhub",
              "https://satori.lv/profile/-23535",
              "http://forum.yealink.com/forum/member.php?action=profile&uid=301831",
              "https://visual.ly/users/nottyhubcom/portfolio",
              "http://krachelart.com/UserProfile/tabid/43/userId/1259961/Default.aspx",
              "http://mayfever.crowdfundhq.com/users/nottyhub",
              "https://det.social/@nottyhub",
              "https://forum.melanoma.org/user/nottyhub/profile/",
              "https://hackmd.io/@nottyhub/BJUodbaPT",
              "https://jali.me/nottyhub",
              "https://www.australia-australie.com/membres/nottyhub/profile/",
              "https://www.bookemon.com/member-home/nottyhub/1023676",
              "https://www.bricklink.com/aboutMe.asp?u=nottyhubcom",
              "https://www.backlinkcontroller.com/website-info/8c84bba81fa0ab8e62309bab9f79ab1f/",
              "https://batotoo.com/user/1791422/nottyhub",
              "https://app.pluralsight.com/profile/nottyhubcom-gmailcom",
              "https://careercup.com/user?id=4835283088965632",
              "https://thedailyblog.co.nz/author/nottyhub/",
              "https://community.fyers.in/member/woFFcWbGDG",
              "https://defol.io/xxx-video-nottyh",
              "https://www.vgnetwork.com/members/nottyhub/profile/",
              "https://manifold.markets/nottyhub",
              "https://kitsu.io/users/1453351",
              "https://expathealthseoul.com/profile/nottyhub/",
              "https://emplois.fhpmco.fr/author/nottyhub/",
              "https://boersen.oeh-salzburg.at/author/nottyhub/",
              "https://kolaente.dev/nottyhub",
              "http://bbs.zhizhuyx.com/home.php?mod=space&uid=9272024",
              "https://en.bio-protocol.org/userhome.aspx?id=1470447",
              "https://community.dynamics.com/profile/?userid=798f7cd5-bda6-ee11-be37-000d3a15e934",
              "https://westsidepizza.breakawayiris.com/Activity-Feed/My-Profile/userId/1707804",
              "https://zzb.bz/Y4CD7",
              "http://worldchampmambo.com/UserProfile/tabid/42/userId/364702/Default.aspx",
              "https://jszst.com.cn/home.php?mod=space&uid=2639995",
              "http://1ctv.cn/home.php?mod=space&uid=2932862",
              "https://m.jingdexian.com/home.php?mod=space&uid=2233720",
              "https://nottyhub.notepin.co/",
              "https://faceparty.com/nottyhub",
              "https://www.jqwidgets.com/community/users/nottyhub/",
              "https://www.mifare.net/support/forum/users/nottyhub/",
              "https://meuanunciogratis.com.br/index.php/author/nottyhub/",
              "http://inuyasha-fanfiction.com/viewuser.php?uid=51364",
              "https://nowewyrazy.uw.edu.pl/profil/nottyhub",
              "https://market360.vn/page/12186",
              "https://plaza.rakuten.co.jp/nottyhub/diary/202312300000/",
              "https://vws.vektor-inc.co.jp/forums/users/50581",
              "http://www.video-bookmark.com/bookmark/6071828/nottyhub/",
              "http://01bim.com/home.php?mod=space&uid=351936",
              "https://filmow.com/usuario/nottyhub",
              "https://wperp.com/users/nottyhub/",
              "https://nottyhub.studio.site/",
              "https://zmxw.cc/home.php?mod=space&uid=2347840",
              "http://www.jbt4.com/home.php?mod=space&uid=8532541",
              "https://www.blackhatworld.com/members/nottyhubc.1858884/#about",
              "https://www.telix.pl/profile/nottyhub/",
              "https://tess.elixir-europe.org/users/nottyhub"
            ] 
          }
        ),
      },

      { 
        src: "/js/analitics.js", 
        mode: 'client' 
      },
    ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui' },
      { name: 'theme-color', content: '#1E1E1E' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'robots', content: 'index, follow' },
      
      { name: 'BASE_URL', content: process.env.BASE_URL },
      
    ],

    link: [
    
      { rel: "icon", sizes: "192x192", href: "/linklogo/ic_launcher192x192.png" },
      { rel: "icon", sizes: "36x36", href: "/linklogo/ic_launcher36x36.png"},
      { rel: "icon", sizes: "48x48", href: "/linklogo/ic_launcher48x48.png"},
      { rel: "icon", sizes: "72x72", href: "/linklogo/ic_launcher72x72.png"},
      { rel: "icon", sizes: "96x96", href: "/linklogo/ic_launcher96x96.png"},
      { rel: "icon", sizes: "144x144", href: "/linklogo/ic_launcher144x144.png"},
      

  
      { rel: "apple-touch-icon", sizes: "180x180", href: "/linklogo/icon-60@3x.png"},
      { rel: "apple-touch-icon", sizes: "120x120", href: "/linklogo/icon-60@2x.png"},
      { rel: "apple-touch-icon", sizes: "128x128", href: "/linklogo/icon-64@2x.png"},
      { rel: "apple-touch-icon", sizes: "152x152", href: "/linklogo/icon-76@2x.png"},
      { rel: "manifest", href: "/site.webmanifest" },

      { rel: "canonical", href: "https://nottyhub.com/" },

    ]
  },

  css: [
    'vant/lib/index.css',
    '~/static/less/common.less',
    '~/static/less/theme.less',
    // '~/static/less/pc.less'
  ],
  plugins: [
    '~/plugins/utils.js',
    '~/plugins/vant.js',
    "~/plugins/axios/index.js",
    { src: '~/plugins/store-cache', ssr: false },
  ],
  loading: {
    color: '#FFE500',
    height: '2px'
  },
  components: true,

  buildModules: [
  ],

  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/api': {
      target: process.env.BASE_URL,
      changeOrigin: true,
      logLevel: "debug",
      secure: false
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
      },
      {
        code: 'pt',
        iso: 'pt-PT',
        name: 'Português',
      },
    ],
    strategy: 'prefix',
    defaultLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
      lazy: true,
      messages: {
        en: require('./locales/en.json'),
        pt: require('./locales/pt.json'),
      },
    },
    detectBrowserLanguage: false,

  },

  build: {
    extractCSS: true,
    publicPath: '/dist/',
    // 配置less
    loaders: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
    // 配置postcss 
    postcss: {
      postcssOptions: {
        plugins: {
          'postcss-px-to-viewport-8-plugin': {
            viewportWidth: 375, // 设计稿的宽度
            // viewportHeight: 667, // 设计稿的高度
            unitPrecision: 3, // px to vw无法整除时，保留几位小数
            viewportUnit: 'vw', // 转换成vw单位
            selectorBlackList: ['.ignore', '.hairlines'], // 不转换的类名
            minPixelValue: 1, // 小于1px不转换
            mediaQuery: false, // 允许在媒体查询中转换px
          },
          'postcss-mobile-forever': {
            // "disableMobile": true, // 设置为 false 表示只在非移动端生效
            "viewportWidth": 750,
            "appSelector": "#__nuxt",
            // "maxDisplayWidth": 600,
            "enableMediaQuery": true,
          },
          'postcss-css-variables': {},
          'postcss-import': {},
          'postcss-preset-env': {
            browsers: 'last 2 versions, IE 9', // 添加 IE 9 兼容
          },
        },
      },
    },

    plugins: [
      new CompressionPlugin({
        test: /\.js$|\.html$|\.css/,
        threshold: 10240, 
        deleteOriginalAssets: false 
      })
    ],

    optimization: {
      minimize: true,
      minimizer: [],
      splitChunks: {
        chunks: "all",
        automaticNameDelimiter: "-",
        maxSize: 102400,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10, //优先级
            reuseExistingChunk: true,
          },
          common: {
            minChunks: 2,
            priority: -20, //优先级
            reuseExistingChunk: true,
          },
        },
      },
    },

    extend(config, { isDev, isClient }) {
      // 找到 babel-loader 配置或创建一个新的规则
      const babelLoader = config.module.rules.find(rule => rule.test.toString() === '/\\.m?js$/') || {
        test: /\.m?js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      };

      // 如果找到规则，添加 include，否则创建新规则并添加 include
      if (babelLoader.include) {
        babelLoader.include.push(/(node_modules|other_module_to_include)/);
      } else {
        babelLoader.include = [/(node_modules|other_module_to_include)/];
        config.module.rules.push(babelLoader);
      }

      // 添加额外的 babel-loader 配置，排除其他模块
      config.module.rules.push({
        test: /\.m?js$/,
        exclude: /(node_modules|other_module_to_exclude)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      });
    },

  },

  serverMiddleware: [
    {
      path: '/en/home',
      handler: '~/middleware/cache.js'
    },
    {
      path: '/pt/home',
      handler: '~/middleware/cache.js'
    },
  ],
}
