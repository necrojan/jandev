/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

const React = require("react");
const safePrefix = require("./src/utils/safePrefix").default;

exports.onRenderBody = function ({ setHeadComponents, setPostBodyComponents }) {

    setHeadComponents([
        <script dangerouslySetInnerHTML={{
            __html:`window._mNHandle = window._mNHandle || {};
            window._mNHandle.queue = window._mNHandle.queue || [];
            medianet_versionId = "3121199";`
        }} />,
        <script src="https://contextual.media.net/dmedianet.js?cid=8CUH6F904" async="async"></script>
    ]);

    setPostBodyComponents([
        <React.Fragment>
            <script src={safePrefix('assets/js/plugins.js')} />
            <script src={safePrefix('assets/js/main.js')} />
            <div id="886859209">
                <script dangerouslySetInnerHTML={{
                    __html: `
                    try {
                        window._mNHandle.queue.push(function () {
                            window._mNDetails.loadTag("886859209", "728x90", "886859209");
                        });
                    } catch (error) {}`
                }} />
            </div>
        </React.Fragment>
    ]);

};
