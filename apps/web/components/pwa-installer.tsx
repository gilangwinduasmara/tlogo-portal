"use client";

import { useEffect } from "react";

export default function PwaInstaller({ children }: { children: React.ReactNode }) {
    const handleInstall = () => {
        // if ('serviceWorker' in navigator && 'PushManager' in window) {
        //     window.addEventListener('beforeinstallprompt', (e) => {
        //         e.preventDefault();
        //         console.log('beforeinstallprompt event fired');

        //         const deferredPrompt = e as any;

        //         const installButton = document.createElement('button');
        //         installButton.textContent = 'Install App';
        //         installButton.style.position = 'fixed';
        //         installButton.style.top = '10px';
        //         installButton.style.left = '50%';
        //         installButton.style.transform = 'translateX(-50%)';
        //         installButton.style.zIndex = '9999';
        //         installButton.style.padding = '10px 20px';
        //         installButton.classList.add('btn-grad');
        //         installButton.style.color = 'white';
        //         installButton.style.border = 'none';
        //         installButton.style.borderRadius = '5px';
        //         installButton.style.cursor = 'pointer';

        //         installButton.addEventListener('click', () => {
        //             console.log('Install button clicked');

        //             deferredPrompt.prompt();

        //             deferredPrompt.userChoice.then((choiceResult: any) => {
        //                 if (choiceResult.outcome === 'accepted') {
        //                     console.log('App installed');
        //                 } else {
        //                     console.log('App installation declined');
        //                 }

        //                 installButton.style.display = 'none';
        //             });
        //         });

        //         document.body.appendChild(installButton);
        //     });
        // } else {
        //     console.log('Service workers and push messaging are not supported by this browser');
        // }
    }
    return (
        <>
            <div onClick={handleInstall} className="w-full">
                {children}
            </div>
        </>
    );
}