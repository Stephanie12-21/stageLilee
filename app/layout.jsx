import { Poppins } from "next/font/google";
import "./globals.css";
import Provider from "./context/Provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Lilee",
  description: "Live like everyone else",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Provider>
        {" "}
        <body className="font-poppins ">{children}</body>
      </Provider>
    </html>
  );
}

// import { Poppins } from "next/font/google";
// import "./globals.css";
// import Provider from "./context/Provider";

// const poppins = Poppins({
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   variable: "--font-poppins",
// });

// export const metadata = {
//   title: "Lilee",
//   description: "Live like everyone else",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         {/* Script Google AdSense */}
//         {/* <script
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7515475048796489"
//           crossorigin="anonymous"
//         ></script>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//               (adsbygoogle = window.adsbygoogle || []).push({
//                 google_ad_client: "ca-pub-7515475048796489",
//                 enable_page_level_ads: true
//               });
//             `,
//           }}
//         ></script> */}
//         <script
//           async
//           src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7515475048796489"
//           crossorigin="anonymous"
//         ></script>

//         <ins
//           class="adsbygoogle"
//           style="display:block"
//           data-ad-client="ca-pub-7515475048796489"
//           data-ad-slot="7853838278"
//           data-ad-format="auto"
//           data-full-width-responsive="true"
//         ></ins>
//         <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
//       </head>
//       <Provider>
//         <body className="font-poppins">{children}</body>
//       </Provider>
//     </html>
//   );
// }
