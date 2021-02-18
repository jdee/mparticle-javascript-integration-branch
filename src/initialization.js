var initialization = {
    name: 'BranchMetrics',
    initForwarder: function(settings, testMode, userAttributes, userIdentities, processEvent, eventQueue, isInitialized, common) {
        var requireBranch = true;
        var synchronousLoad = false;

        if (!testMode) {
            var branch;
            console.log('Determining Branch SDK source');
            if (!!window && !requireBranch) {
                if (!!window.branch) {
                    console.log('Branch SDK already initialized');
                    return;
                }

                var scriptUrl = 'https://cdn.branch.io/branch-latest.min.js';
                /*
                 * Pass { synchronousLoad: true } in settings to add a script
                 * tag directly to synchronously load the Branch Web SDK from
                 * CDN.
                 */
                if (!!synchronousLoad) {
                    /*
                     * Load synchronously
                     */
                    console.log('Loading Branch SDK synchronously from ' + scriptUrl);
                    var scriptTag = document.createElement('script');
                    scriptTag.async = 0;
                    scriptTag.src = scriptUrl;
                    var firstScript = document.getElementByTagName('script')[0];
                    firstScript.parentNode.insertBefore(scriptTag, firstScript);
                }
                else {
                    /*
                     * Load asynchronously.
                     */
                    console.log('Loading Branch SDK asynchronously from ' + scriptUrl);
                    (function(b,r,a,n,c,h,_,s,d,k){if(!b[n]||!b[n]._q){for(;s<_.length;)c(h,_[s++]);d=r.createElement(a);d.async=1;d.src=scriptUrl;k=r.getElementsByTagName(a)[0];k.parentNode.insertBefore(d,k);b[n]=h}})(window,document,"script","branch",function(b,r){b[r]=function(){b._q.push([r,arguments])}},{_q:[],_v:1},"addListener applyCode autoAppIndex banner closeBanner closeJourney creditHistory credits data deepview deepviewCta first getCode init link logout redeem referrals removeListener sendSMS setBranchViewData setIdentity track validateCode trackCommerceEvent logEvent disableTracking getBrowserFingerprintId crossPlatformIds lastAttributedTouchData".split(" "), 0);
                }

                branch = window.branch;
            }
            else {
                /*
                 * Load NPM dependency.
                 */
                console.log('Loading Branch SDK from node_modules');
                branch = require('branch-sdk');
            }

            console.log('Initializing Branch SDK');
            branch.init(settings.branchKey, function(err, data) {
                isInitialized = true;
            });
        }
    }
};

module.exports = initialization;
