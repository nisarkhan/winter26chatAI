'use client'

import Script from 'next/script'

// Extend Window interface for Salesforce Embedded Messaging
declare global {
  interface Window {
    initEmbeddedMessaging?: () => void;
    embeddedservice_bootstrap?: {
      isInitialized?: boolean;
      settings: {
        language: string;
      };
      init: (orgId: string, deploymentId: string, url: string, options: { scrt2URL: string }) => void;
    };
  }
}

export default function ChatWidget() {
  return (
    <>
      <Script
        id="embedded-messaging-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.initEmbeddedMessaging = function () {
              try {
                if (window.embeddedservice_bootstrap?.isInitialized) return;

                embeddedservice_bootstrap.settings.language = 'en_US'; // For example, enter 'en' or 'en-US'
                embeddedservice_bootstrap.init(
                    '00DgK00000KuA61',
                    'soa313_web_message_channel',
                    'https://orgfarm-0e9cabbd06-dev-ed.develop.my.site.com/ESWsoa313webmessagecha1773268998912',
                    {
                        scrt2URL: 'https://orgfarm-0e9cabbd06-dev-ed.develop.my.salesforce-scrt.com'
                    }
                );
              } catch (err) {
                console.error('Embedded Messaging error:', err);
              }
            };
          `,
        }}
      />

      <Script
        src="https://orgfarm-0e9cabbd06-dev-ed.develop.my.site.com/ESWsoa313webmessagecha1773268998912/assets/js/bootstrap.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && typeof window.initEmbeddedMessaging === 'function') {
            window.initEmbeddedMessaging();
          }
        }}
      />
    </>
  )
}
