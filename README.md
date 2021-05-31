アプリケーション概要：amazonのようなECショッピングサイトです。
URL: https://my-portfolio-jungle.herokuapp.com/

アプリ機能
・サインアップ、サインイン機能　
・サイト内商品検索機能(ヘッダー中央の検索欄と左はじのハンバーガーメニューよりカテゴリ別商品検索が可能)
・商品レビュー投稿機能
・サインイン後利用可能な機能
　-カート追加、削除から決済までのフロー
　-お客様サポート用チャット機能（ログインすると右下にアイコンが現れます。ただし開発途中のため、コメントはDBにも保存されず、返答機能は追加できておりません）
・セラー向け機能(サインアップ時に「セラーとして登録」を選択するとヘッダー右上にadminボタンが現れます。)
　-商品登録、編集機能（商品情報および画像の登録が可能です。ただし画像のリサイズ機能はなく、元のサイズのまま追加されます）
  -売上管理用ダッシュボード
・その他
　-レスポンシブ対応（端末によっては若干レイアウト崩れることがあるかもしれません）

使用技術
・主要言語、技術
　-フロントエンド：javascript(jquery),html&css(ejsというテンプレートエンジンを使用)
  -サーバーサイド：node.js(express)
  -データベース：mongoDB(mongoDB atlasというクラウドDBを使用)
  -インフラ：heroku。サイト内の画像ファイルのストレージ先としてだけAWS S3というクラウドストレージを使用
・機能追加に利用したlibrary等
　-セッション管理には「express-session」、パスワードのhash化には「bcryptjs」を使用
  -画像のuploadには「multer」を使用
  -決済機能はpaypalの「sandbox」というテスト決済機能を利用。※実際には決済されません。
  -チャット機能には「socket.io」を使用
・その他
　-file構成は「mvcモデル」を参考にしました


Github account
URL: https://github.com/smgcknt-tech

Application Overview: An EC shopping site like amazon.
URL: https://my-portfolio-jungle.herokuapp.com/

App function
・ Sign-up and sign-in functions
・ In-site product search function (You can search for products by category from the search field in the center of the header and the hamburger menu on the left)
・ Product review function
・ Functions available after signing in
-Flow from cart addition / deletion to payment
-Chat function for customer support (When you log in, an icon will appear at the bottom right. However, because it is under development, comments are not saved in the DB and the reply function cannot be added)
-Seller function (If you select "Register as seller" when signing up, the admin button will appear in the upper right corner of the header.)
-Product registration and editing functions (Product information and images can be registered. However, there is no image resizing function, and the original size will be added).
-Sales management dashboard
・ Other
-Responsive support (Layout may be slightly broken depending on the terminal)

Technology used
・ Main languages ​​and technologies
-End: javascript (jquery), html & css (using front engine called ejs)
-Server side: node.js (express)
-Database: mongoDB (using a cloud DB called mongoDB atlas)
-Infrastructure: heroku. Use AWS S3 cloud storage only as a storage destination for image files on your site

・ Library used to add functions
-Used "express-session" for session management and "bcryptjs" for password hashing
-Used "multer" to upload images
-The payment function uses paypal's "sandbox" test payment function. * It is not actually settled.
-Used "socket.io" for chat function
・ Other
-File configuration referred to "mvc model"
　

