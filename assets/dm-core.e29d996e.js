(function(){"use strict";if(document.getElementById("dropmagic-badge"))return;(function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t2,e2){var o2=e2.split(".");o2.length==2&&(t2=t2[o2[0]],e2=o2[1]),t2[e2]=function(){t2.push([e2].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(a!==void 0?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t2){var e2="posthog";return a!=="posthog"&&(e2+="."+a),t2||(e2+=" (stub)"),e2},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Ie Ts Ms Ee Es Rs capture Ge calculateEventProperties Os register register_once register_for_session unregister unregister_for_session js getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Ds Fs createPersonProfile Ls Ps opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing Cs debug I As getPageViewId captureTraceFeedback captureTraceMetric".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)})(document,window.posthog||[]),posthog.init("phc_KwMZEhmFKWQtPbGLaZ9dRn8glyQXeyVSuBQIjnevskz",{api_host:"https://us.i.posthog.com",defaults:"2025-05-24",person_profiles:"always"});const allowedReferrers=["minea.com","autods.com","dropship.io","winninghunter.com","trendtrack.io","dropispy.com","bigspy.com","ppspy.com","pipiads.com","nichescraper.com","findniche.com","sellthetrend.com"],CACHE_KEY="dropmagic_badge_validation",CACHE_DURATION=1e3*60*5;function persistReferrer(){try{!sessionStorage.getItem("dropmagic_original_referrer")&&document.referrer&&sessionStorage.setItem("dropmagic_original_referrer",document.referrer)}catch{}}function isFromFacebookAdsLibrary(referrerUrl){try{if(!new URL(referrerUrl).hostname.includes("facebook.com"))return!1;const isAdsLibrary=!new URLSearchParams(window.location.search).has("fbclid");return isAdsLibrary&&console.log("\u2705 Detected Facebook Ads Library traffic (facebook.com referrer + no fbclid)"),isAdsLibrary}catch{return!1}}function matchesGeneralReferrer(referrerUrl){try{const url=new URL(referrerUrl);return allowedReferrers.find(domain=>url.hostname.endsWith(domain))||!1}catch{return!1}}function matchesReferrer(){persistReferrer();let referrerUrl=null;if(document.referrer)referrerUrl=document.referrer;else try{const persistedReferrer=sessionStorage.getItem("dropmagic_original_referrer");if(persistedReferrer)referrerUrl=persistedReferrer;else{const navEntries=performance.getEntriesByType("navigation");navEntries.length>0&&navEntries[0].referrer&&(referrerUrl=navEntries[0].referrer)}}catch{}if(!referrerUrl)return console.log("\u{1F50D} Dropmagic: No referrer found"),!1;console.log("\u{1F50D} Dropmagic: Referrer found:",referrerUrl);let referrerType=null,additionalData={};if(isFromFacebookAdsLibrary(referrerUrl))referrerType="facebook_ads_library";else{const matchedDomain=matchesGeneralReferrer(referrerUrl);if(matchedDomain){referrerType=matchedDomain;try{additionalData.referrer_domain=new URL(referrerUrl).hostname}catch{}}}return referrerType?(console.log("\u2705 Dropmagic: Valid referrer type:",referrerType),{isValid:!0,referrerUrl,referrerType}):(console.log("\u274C Dropmagic: Referrer not whitelisted:",referrerUrl),!1)}function getCachedValidation(){try{const cached=localStorage.getItem(CACHE_KEY);if(!cached)return null;const{timestamp,isValid,shopDomain}=JSON.parse(cached),now=Date.now(),currentShop=window.Shopify?.shop;return now-timestamp>CACHE_DURATION||shopDomain!==currentShop?(localStorage.removeItem(CACHE_KEY),null):isValid}catch{return localStorage.removeItem(CACHE_KEY),null}}function setCachedValidation(isValid){try{const cacheData={timestamp:Date.now(),isValid,shopDomain:window.Shopify?.shop};localStorage.setItem(CACHE_KEY,JSON.stringify(cacheData))}catch{console.warn("Failed to cache badge validation")}}async function checkApiValidation(){const cachedResult=getCachedValidation();if(cachedResult!==null)return console.log("\u{1F4BE} Dropmagic: Using cached subscription status:",cachedResult?"Active":"Inactive"),cachedResult;const shopifyDomain=window.Shopify?.shop;if(!shopifyDomain)return console.warn("Shopify shop domain not found"),!1;console.log("\u{1F50D} Dropmagic: Checking subscription for shop:",shopifyDomain);try{const response=await fetch(`https://app.dropmagic.ai/api/is-allowed?shopify_domain=${encodeURIComponent(shopifyDomain)}`,{method:"GET",headers:{"Content-Type":"application/json"}});if(!response.ok)throw new Error(`HTTP ${response.status}`);const isValid=(await response.json()).isValid===!0;return console.log("\u{1F512} Dropmagic: Subscription status:",isValid?"Active \u2705":"Inactive \u274C"),setCachedValidation(isValid),isValid}catch(error){return console.warn("\u274C Dropmagic: Failed to check subscription:",error),console.log("\u{1F512} Dropmagic: Subscription status: Unknown (API Error) \u26A0\uFE0F"),setCachedValidation(!1),!1}}async function shouldShowBadge(){return console.log("\u{1F680} Dropmagic: Starting badge validation..."),await checkApiValidation()?(console.log("\u{1F6D1} Dropmagic: Badge will NOT show - Active subscription found"),!1):(console.log("\u{1F389} Dropmagic: Badge will SHOW - No subscription found"),{shouldShow:!0,referrerUrl:null,referrerType:null})}async function initBadge(){const badgeValidation=await shouldShowBadge();if(!badgeValidation||!badgeValidation.shouldShow)return;const{referrerUrl,referrerType}=badgeValidation,badge=document.createElement("div");badge.id="dropmagic-badge";const innerContainer=document.createElement("div");innerContainer.className="dropmagic-inner";const logoContainer=document.createElement("div");logoContainer.className="dropmagic-logo";const logo=document.createElement("img");logo.src="https://cdn.dropmagic.ai/logos/logo_square_transparent.png",logo.alt="Dropmagic",logo.className="dropmagic-logo-img",logoContainer.appendChild(logo);const textContainer=document.createElement("div");textContainer.className="dropmagic-text";const madeWithText=document.createElement("div");madeWithText.className="dropmagic-made-with",madeWithText.textContent="Made with";const dropmagicLogo=document.createElement("img");dropmagicLogo.className="dropmagic-brand",dropmagicLogo.src="https://cdn.dropmagic.ai/logos/name_logo.png",dropmagicLogo.alt="Dropmagic",dropmagicLogo.width=85,dropmagicLogo.height=18,textContainer.appendChild(madeWithText),textContainer.appendChild(dropmagicLogo);const notification=document.createElement("div");notification.className="dropmagic-notification";let notificationMessage="";if(referrerType){let referrerName="a dropshipping platforms";if(referrerType==="facebook_ads_library")referrerName="Facebook Ads Library";else if(referrerUrl)try{referrerName=new URL(referrerUrl).hostname}catch{referrerName="a referrer"}notificationMessage=`You are seeing this because we detected you are coming from ${referrerName}. This will not be shown to an end customer.`}else window.Shopify&&window.Shopify.designMode===!0&&(notificationMessage="Your Dropmagic subscription is not active, this is why you are seeing this badge.");notificationMessage&&(notification.textContent=notificationMessage),innerContainer.appendChild(logoContainer),innerContainer.appendChild(textContainer),badge.appendChild(innerContainer),notificationMessage&&badge.appendChild(notification);const styles=document.createElement("style");styles.textContent=`
      @keyframes dropmagicSlideInBounce {
        0% {
          transform: translateY(100px);
          opacity: 0;
        }
        60% {
          transform: translateY(-7px);
          opacity: 1;
        }
        80% {
          transform: translateY(2px);
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
      
      @keyframes dropmagicFadeIn {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      
      #dropmagic-badge {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #000000;
        border-radius: 12px;
        padding: 4px;
        z-index: 999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      
      #dropmagic-badge.animate-in {
        animation: dropmagicSlideInBounce 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
      }
      
      #dropmagic-badge:hover {
        transform: translateY(-4px) scale(1.02);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.4);
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      
      #dropmagic-badge:active {
        transform: translateY(-2px) scale(1.01);
        transition: all 0.1s cubic-bezier(0.4, 0.0, 0.2, 1);
      }
      
      .dropmagic-inner {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        transition: border-color 0.3s ease;
      }
      
      #dropmagic-badge:hover .dropmagic-inner {
        border-color: rgba(255, 255, 255, 0.3);
      }
      
      .dropmagic-logo {
        display: flex;
        align-items: center;
        flex-shrink: 0;
      }
      
      .dropmagic-logo-img {
        width: 30px;
        height: 30px;
        display: block;
        transition: transform 0.3s ease;
      }
      
      .dropmagic-text {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }
      
      .dropmagic-made-with {
        font-size: 10px;
        color: rgba(255, 255, 255, 0.7);
        line-height: 1.2;
        font-weight: 600;
        transition: color 0.3s ease;
      }
      
      .dropmagic-brand {
        display: block;
        max-width: 85px;
        transition: opacity 0.3s ease;
      }
      
      #dropmagic-badge:hover .dropmagic-made-with {
        color: rgba(255, 255, 255, 0.9);
      }
      
      #dropmagic-badge:hover .dropmagic-brand {
        opacity: 1;
      }
      
      .dropmagic-notification {
        position: absolute;
        bottom: 100%;
        right: 0;
        margin-bottom: 12px;
        background: #1a1a1a;
        color: #ffffff;
        padding: 12px 16px;
        border-radius: 8px;
        font-size: 13px;
        line-height: 1.4;
        white-space: nowrap;
        max-width: 300px;
        white-space: normal;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        opacity: 0;
        visibility: hidden;
        transform: translateY(8px);
        transition: all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1);
        pointer-events: none;
        z-index: 10000;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        font-weight: 500;
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .dropmagic-notification::after {
        content: '';
        position: absolute;
        top: 100%;
        right: 20px;
        border: 6px solid transparent;
        border-top-color: #1a1a1a;
      }
      
      #dropmagic-badge:hover .dropmagic-notification {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      
      /* Mobile responsiveness */
      @media (max-width: 768px) {
        #dropmagic-badge {
          bottom: 15px;
          right: 15px;
          transform: scale(0.9) translateY(100px);
        }
        
        #dropmagic-badge.animate-in {
          animation: dropmagicSlideInBounce 0.5s cubic-bezier(0.4, 0.0, 0.2, 1) forwards;
        }
        
        #dropmagic-badge:hover {
          transform: scale(0.92) translateY(-2px);
        }
        
        .dropmagic-notification {
          max-width: 250px;
          font-size: 12px;
          padding: 10px 12px;
        }
        
        .dropmagic-notification::after {
          right: 16px;
          border-width: 5px;
        }
      }
    `,badge.addEventListener("click",function(e){e.preventDefault();try{if(window.posthog&&typeof window.posthog.capture=="function"){const eventData={shop_domain:window.Shopify?.shop};referrerUrl&&referrerType&&(eventData.property=referrerUrl,eventData.referrer_type=referrerType),posthog.capture("shopify_saas_badge_clicked",eventData)}}catch(e2){console.warn("PostHog badge click tracking failed:",e2)}window.open("https://dropmagic.ai?utm_source=badge","_blank","noopener,noreferrer")}),document.head.appendChild(styles),document.body.appendChild(badge),setTimeout(function(){badge.classList.add("animate-in");try{if(window.posthog&&typeof window.posthog.capture=="function"){const eventData={shop_domain:window.Shopify?.shop,type:"subscription_inactive"};referrerType&&(eventData.property=referrerUrl,eventData.referrer_type=referrerType,eventData.type="referrer"),posthog.capture("shopify_saas_badge_displayed",eventData)}}catch(e){console.warn("PostHog badge display tracking failed:",e)}},1500),setTimeout(function(){const dropmagicBadge=document.getElementById("dropmagic-badge");dropmagicBadge&&(dropmagicBadge.style.setProperty("display","block","important"),dropmagicBadge.style.setProperty("visibility","visible","important"),dropmagicBadge.style.setProperty("opacity","1","important"),dropmagicBadge.classList.contains("animate-in")||dropmagicBadge.classList.add("animate-in"),console.log("\u{1F6E1}\uFE0F Dropmagic: Security check - ensuring badge visibility"))},2e3)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",initBadge):initBadge()})();
//# sourceMappingURL=/cdn/shop/t/6/assets/dm-core.js.map?v=71448697708784198051776801634
