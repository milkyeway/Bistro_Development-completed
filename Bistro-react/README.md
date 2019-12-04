
【　更　新　概　要　】  
  
2019.11.08  
．酒具商品列表頁（Wine_Accessories）  
　｜_　頁面所需元件拆解與重組  
　｜　　　（src/components/Wine_Accessories）  
　｜　　　　　|_　Wine_accessories_index（組合頁）  
　｜　　　　　|_　Accessories_left_cate  
　｜　　　　　|_　Accessories_left_sort  
　｜　　　　　|_　Accessories_left_priceSlider  
　｜　　　　　|_　Accessories_right_goods  
　｜　　　　　|_　Accessories_right_pages  
　｜  
　｜_　頁面所需CSS  
　　　　　　（style/Wine_accessories/Wine_accessories_index.scss）  
  
．待解決問題  
　1.　<del>Accessories_left_priceSlider 有使用 jQuery UI 插件，吃不到 CDN </del>已解決  
　2.　RWD  
<hr />　

2019.11.09  
．酒具商品細節頁（Wine_Accessories）  
　｜_　頁面所需元件拆解與重組  
　｜　　　（src/components/Wine_Accessories）  
　｜　　　　　|_　Wine_accessories_detail（組合頁）  
　｜　　　　　|_　Wine_acce_detail_breadcrumb  
　｜　　　　　|_　Wine_acce_detail_picslider  
　｜　　　　　|_　Wine_acce_detail_picslider_preview  
　｜　　　　　|_　Wine_acce_detail_info  
　｜　　　　　|_　Wine_acce_detail_info_btn  
　｜　　　　　|_　Wine_acce_detail_dec_title  
　｜　　　　　|_　Wine_acce_detail_recommenditem  
　｜  
　｜_　頁面所需CSS  
　　　　　　（style/Wine_accessories/Wine_service_detail.scss）  
　    
<b>．重要備註：已把 Mike 在11/09 上傳雲端的檔案匯入覆蓋</b>  
　  
．待解決問題  
　1.　<del>Accessories_right_goods 想連結到細節頁的 Router 可能被寫壞了XD</del> 已解決  
　2.　<del>Wine_acce_detail_picslider_preview 的JQ尚未寫完</del> 已解決  
　3.　RWD  
<hr />　

2019.11.11 Pocky日  
．酒具商品列表頁（Wine_Accessories）  
　｜_　頁面元件  
　｜　　|_　Accessories_left_priceSlider 有更新！  
　｜_　頁面CSS  
　  　　|_　style/Wine_accessories/Wine_accessories_index.scss 有更新！  
　    
．酒具商品列表頁－酒具商品細節頁 Link 已連結（感謝React老師和Mike）  
．酒具商品列表頁的價格區間選擇器已完成（感謝Material-UI）
 
<b>．重要備註：需載入Material-UI</b>  
　  
．待解決問題  
 1. onChange事件、onClick事件  
 2. RWD  
 
2019.11.18  一

．購物車（ShopingCar）  、 購物車詳細訂單 (Billing_details)

　｜_　頁面元件  
　｜　　|_　ShopingCar、Billing_details 已完成！ 
　｜_　頁面CSS   
　  　　|_　style/Shoping/ShopingCar.scss 已完成！      
　  　　|_　style/Shoping/Billing_details.scss 已完成！ 
　    
．RWD 已完成

 2019.11.20  三

．node & react頁面串聯（)

　｜_　頁面元件   
　｜　　|_　ShopingCar、Billing_details 已完成！  
　｜_　node    
　  　　|_　database.js  已完成！ 在204教室時，要Milkye的電腦打開才能用這個db
　  　　|_                        在自己家裡或想改自己的db伺服器時需要把host改成自己的
　  　　|_                        但資料表要即時從共用php雲端更新最新資料表，避免出錯 
　  　　|
　  　　|_　 路由放在API資料夾     
　  　　|_　 新德老師版本 請參考   Api/manbers.js 有自定義db！
　  　　|_　 王老師版本   請參考   Api/carts.js     db已引入database.js
　  　　|_　 
　  　　|_　 
Node.js
．酒具、酒 商品 已完成串聯
React
．首頁、酒、酒具、活動、酒餐廳 已完成串聯  缺少會員、Blog頁面
 
 
注意！！！ 

my-react-app最外層的圖像請丟到public裡面，另外public / lib圖片資料夾請去小組雲端下載（資料庫圖片）

node-rest-bitro為Node.JS檔案請拔出來放React外層
　  
．待解決問題  
 1. onChange事件、onClick事件  
 2. JQuery 事件失敗
 3. React & Node.js   會員、Blog頁面  串聯資料
