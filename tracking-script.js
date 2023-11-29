(function () {
  var referer = "https://www.bing.com/";
  var documentURL = document.URL;
  const numberMappings = {
    google: "(878) 630-7000",
    bing: "(878) 630-7050",
  };

  function getReferrerDomain(e) {
    var t = e.split("/")[2],
      r = t.split(".");
    return 2 < r.length ? r[r.length - 2] + "." + r[r.length - 1] : t;
  }

  function findSource(e, t) {
    var r;
    e = e || "direct";
    var n = /utm_medium=([cp]pc|paid_social|paid|.*_ad.*)/i;
    if (t.match(/ndclid=/i)) r = "nextdoor_paid";
    else if (e.match(/doubleclick/i) || t.match(/dclid=|wbraid=|gbraid=/i))
      r = "google_paid";
    else if (e.match(/google/i) && !e.match(/mail\.google\.com/i)) {
      if (t.match(/gclid=/i)) return "google_paid";
      r =
        e.match(/googleadservices/i) ||
        t.match(/utm_(medium|source)=[cp]pc/i) ||
        t.match(/(matchtype|adposition)=/i)
          ? "google_paid"
          : "google";
    } else
      r = t.match(/gclid=/i)
        ? e.match(/(\/|\.)youtube\./i) || t.match(/utm_source=.*youtube.*/i)
          ? "youtube_paid"
          : t.match(/msclkid=/i)
          ? "bing_paid"
          : "google_paid"
        : t.match(/msclkid=/i)
        ? e.match(/(\/|\.)duckduckgo\./i) ||
          t.match(/utm_source=.*duckduckgo.*/i)
          ? "duckduckgo_paid"
          : "bing_paid"
        : e.match(/(\/|\.)bing\./i) || t.match(/utm_source=.*bing.*/i)
        ? t.match(n) || t.match(/msclkid=/i)
          ? "bing_paid"
          : "bing"
        : e.match(/msn\.com/i)
        ? "bing_paid"
        : e.match(/yahoo/i) && !e.match(/mail\.yahoo\.com/i)
        ? t.match(n)
          ? "yahoo_paid"
          : "yahoo"
        : t.match(/fb_ad_id=/i)
        ? e.match(/(\/|\.)instagram\./i) || t.match(/utm_source=.*instagram.*/i)
          ? "instagram_paid"
          : "facebook_paid"
        : t.match(/(fbclid=)/i) && e.match(/(\/|\.)instagram\./i)
        ? t.match(n)
          ? "instagram_paid"
          : "instagram"
        : e.match(/(\/|\.)facebook\./i) ||
          t.match(/(fbclid=|utm_source=.*facebook.*)/i)
        ? t.match(n)
          ? "facebook_paid"
          : "facebook"
        : e.match(/(\/|\.)instagram\./i) || t.match(/utm_source=.*instagram.*/i)
        ? t.match(n)
          ? "instagram_paid"
          : "instagram"
        : e.match(/(\/|\.)linkedin\./i) || t.match(/utm_source=.*linkedin.*/i)
        ? t.match(n)
          ? "linkedin_paid"
          : "linkedin"
        : e.match(/(\/|\.)twitter\./i) || t.match(/utm_source=.*twitter.*/i)
        ? t.match(n)
          ? "twitter_paid"
          : "twitter"
        : e.match(/(\/|\.)yelp\./i) || t.match(/utm_source=.*yelp.*/i)
        ? t.match(n) ||
          t.match(/utm_(medium|source|campaign)=yelp_ad/i) ||
          t.match(/campaign_code=yelp_ad/i)
          ? "yelp_paid"
          : "yelp"
        : e.match(/(\/|\.)youtube\./i) || t.match(/utm_source=.*youtube.*/i)
        ? t.match(n)
          ? "youtube_paid"
          : "youtube"
        : "direct" === e
        ? t.match(n) && t.match(/utm_source=.*google.*/i)
          ? "google_paid"
          : "direct"
        : getReferrerDomain(e);
    return r;
  }

  function replace_number() {
    try {
      var elms = document.querySelectorAll("[id='telephone-1']");
      for (var i = 0; i < elms.length; i++) {
        const source = "bing";
        console.log("replacing");
        const phoneNumber = numberMappings[source];
        if (phoneNumber) {
          elms[i].innerHTML = phoneNumber;
          const numbersOnly = phoneNumber.replace(/\D/g, "");
          elms[i].setAttribute("href", "tel:" + numbersOnly);
        }
        elms[i].classList.add("phone-swap");
      }
    } catch (error) {
      makePhoneButtonVisible();
      console.error(error);
    }
  }

  function makePhoneButtonVisible() {
    var elms = document.querySelectorAll("[id='telephone-1']");
    for (var i = 0; i < elms.length; i++) {
      elms[i].classList.add("phone-swap");
    }
  }

  if (document.readyState == "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      function () {
        console.log("DOMContentLoaded");
        replace_number();
      },
      false
    );
  } else {
    try {
      console.log("replacing");
      replace_number();
    } catch (error) {
      makePhoneButtonVisible();
      console.error(error);
    }
  }
})();
