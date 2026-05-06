// npm install lucide-react recharts firebase
import React, { useState, useEffect } from 'react';
import { Check, X, Home, ChevronRight, ChevronLeft, RefreshCw, BookOpen, Clock, List, ArrowRight } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// ==========================================
// Firebase Configuration & Initialization
// ==========================================
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const APP_ID = "QuizApp_Boki_001";

// ==========================================
// Quiz Data
// ==========================================
const questions = [
  {
    id: 1,
    year: "令和2年 第3問",
    title: "有価証券",
    question: "有価証券の期末評価に関する記述として、最も適切なものはどれか。なお、有価証券の時価は著しく下落していないものとする。",
    choices: [
      "子会社株式および関連会社株式は、取得原価をもって貸借対照表価額とする。",
      "その他有価証券は、時価をもって貸借対照表価額とし、評価差額は当期の損益として処理する。",
      "売買目的有価証券は、時価をもって貸借対照表価額とし、評価差額は貸借対照表の純資産の部に直接計上する。",
      "満期保有目的の債券を額面金額と異なる価額で取得した場合、取得価額と債券の額面金額との差額の性格が金利の調整と認められるときは、額面金額をもって貸借対照表価額とする。"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ア</p>
        <p>本問では、有価証券の期末処理について問われています。有価証券に関する細かい知識を問われているためやや難しい問題です。本問を通して理解を深めていきましょう。</p>
        <p>有価証券は、その保有目的により次のように分類されます。</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-left">
            <tbody>
              <tr className="border-b border-gray-300">
                <th className="p-2 border-r border-gray-300 bg-gray-100 whitespace-nowrap">売買目的有価証券</th>
                <td className="p-2">時価の変動により利益を得ることを目的としているため、期末で時価評価し、評価差額は当期の損益として損益計算書に計上する。</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="p-2 border-r border-gray-300 bg-gray-100 whitespace-nowrap">満期保有目的の債券</th>
                <td className="p-2">満期まで保有することを目的としていると認められる社債その他の債券であるため、期末で時価評価しない。</td>
              </tr>
              <tr className="border-b border-gray-300">
                <th className="p-2 border-r border-gray-300 bg-gray-100 whitespace-nowrap">子会社および関連会社株式</th>
                <td className="p-2">当該企業への影響力の行使を目的として保有する株式であり、時価の変動は投資の成果とはいえないため、期末で時価評価しない。</td>
              </tr>
              <tr>
                <th className="p-2 border-r border-gray-300 bg-gray-100 whitespace-nowrap">その他有価証券</th>
                <td className="p-2">長期的には売却が想定されるが、直ちに売却するとはいえないため、期末で時価評価するが、評価差額は損益とせず純資産に計上する。</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><strong>選択肢アは適切です。</strong>「子会社株式および関連会社株式」は、当該企業への影響力の行使を目的として保有する株式のことです。時価の変動により利益を得ることを目的としていないため、「取得原価」で「貸借対照表」に表示します。</p>
        <p><strong>選択肢イは不適切です。</strong>「その他有価証券」は期末で時価評価しますが、評価差額は損益とせず純資産に計上します。</p>
        <p><strong>選択肢ウは不適切です。</strong>「売買目的有価証券」の評価差額は当期の損益として損益計算書に計上します。</p>
        <p><strong>選択肢エは不適切です。</strong>「満期保有目的の債券」で取得価額と債券金額との差額の性格が金利の調整と認められるときには「償却原価法」に基づいて算定された価額をもって貸借対照表価額とします。</p>
      </div>
    )
  },
  {
    id: 2,
    year: "平成29年 第2問",
    title: "経過勘定",
    question: "20X2年1月1日に300,000千円を期間6カ月、年利5％で取引先Ｚ社に貸し付けた。20X2年6月30日に利息と元金を合わせて受け取る予定である。会計期間は20X2年3月31日までの1年間である。決算にあたり計上される未収利息の金額として、最も適切なものはどれか。",
    choices: [
      "3,750千円",
      "7,500千円",
      "15,000千円",
      "30,000千円"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ア</p>
        <p>経過勘定に関する問題です。未収収益とは、「一定の契約に従い、継続して役務の提供を行う場合、すでに提供した役務に対して、いまだその対価の支払を受けていないもの」のことをいいます。</p>
        <ul className="list-disc ml-5">
          <li>1月1日に300,000千円を期間6ヵ月、年利5％で貸付</li>
          <li>6月30日に利息と元金を受け取る予定</li>
          <li>会計期間は3月31日まで</li>
        </ul>
        <div className="border border-gray-400 p-4 relative my-4 flex flex-col items-center overflow-x-auto text-xs">
           <div className="flex w-full justify-between mb-2">
             <div className="text-center w-1/3">1月1日</div>
             <div className="text-center w-1/3 font-bold">決算日<br/>3月31日</div>
             <div className="text-center w-1/3 font-bold">受取<br/>6月30日</div>
           </div>
           <div className="w-full h-px bg-black mb-4"></div>
           <div className="w-full flex">
             <div className="w-1/2 bg-orange-100 border border-black p-2 text-center">未収利息（3,750千円）</div>
             <div className="w-1/2"></div>
           </div>
           <div className="w-full flex mt-1">
             <div className="w-full bg-orange-100 border border-black p-2 text-center">受取予定の金額（7,500千円）</div>
           </div>
        </div>
        <p>1月1日に貸し付けを行って、契約によって6月30日に受取となるが、1月1日から3月31日までの3ヵ月間は当期に属する未収利息となる。</p>
        <p>未収利息 ＝ 300,000千円 × 5％ × 3 ÷ 12 ＝ 3,750千円</p>
      </div>
    )
  },
  {
    id: 3,
    year: "平成27年 第1問",
    title: "売上原価の算定",
    question: "以下の資料に基づいて、今期の売上原価として最も適切なものを下記の解答群から選べ。\n【資 料】\n期首商品棚卸高：120,000 円\n当期商品純仕入高：650,000 円\n期末帳簿棚卸数量：1,300 個（原価＠100円）\n期末実地棚卸数量：1,000 個\n棚卸減耗損は売上原価とする。",
    choices: [
      "610,000 円",
      "640,000 円",
      "670,000 円",
      "700,000 円"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ウ</p>
        <p>売上原価は、「期首商品棚卸高 ＋ 当期商品仕入高 － 期末商品棚卸高」で算出されます。</p>
        <p>期末商品棚卸高（帳簿） ＝ 1,300個 × ＠100円 ＝ 130,000円</p>
        <p>売上原価（減耗前） ＝ 120,000円 ＋ 650,000円 － 130,000円 ＝ 640,000円</p>
        <div className="flex border border-black w-64 text-center my-4 text-xs">
          <div className="w-1/2 border-r border-black">
            <div className="border-b border-black p-2">期首商品<br/>120,000</div>
            <div className="p-2">当期商品仕入<br/>650,000</div>
          </div>
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 bg-orange-100 border-b border-black p-2 flex items-center justify-center">売上原価<br/>640,000</div>
            <div className="p-2 h-16">期末商品<br/>130,000</div>
          </div>
        </div>
        <p>本問では、「棚卸減耗損は売上原価とする」という指示があります。</p>
        <p>棚卸減耗損 ＝（1,300個－1,000個）× ＠100円 ＝ 30,000円</p>
        <div className="flex border border-black w-64 text-center my-4 text-xs">
          <div className="w-1/2 border-r border-black p-2">B/S商品<br/>100,000<br/>(1,000個)</div>
          <div className="w-1/2 bg-orange-100 p-2">棚卸減耗損<br/>30,000<br/>(300個)</div>
        </div>
        <p>したがって、先に計算した640,000円にこの30,000円を加算した金額670,000円が最終的な売上原価になります。</p>
      </div>
    )
  },
  {
    id: 4,
    year: "平成27年 第4問",
    title: "準備金積立",
    question: "株主総会の決議により、その他資本剰余金を取り崩して600,000円配当することにした。なお、資本金は4,000,000円、準備金の合計は950,000円である。このとき積み立てるべき準備金の種類と金額の組み合わせとして、最も適切なものを選べ。\n【準備金の種類】ａ 資本準備金、ｂ 利益準備金\n【金額】ｃ 50,000 円、ｄ 60,000 円",
    choices: [
      "ａとｃ",
      "ａとｄ",
      "ｂとｃ",
      "ｂとｄ"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ア</p>
        <p>その他資本剰余金を取り崩して配当したため、積み立てるべき準備金の種類は「資本準備金」（ａ）になります。</p>
        <p>配当する剰余金の10分の1の額（60,000円）を準備金として積み立てる必要がありますが、「4分の1規定」により、資本準備金と利益準備金の合計が資本金の4分の1に達するまで積み立てればよいとされています。</p>
        <p>資本金4,000,000円の4分の1は1,000,000円です。現在の準備金の合計は950,000円なので、不足額は50,000円です。</p>
        <p>したがって、配当額の10分の1（60,000円）と、不足額（50,000円）のうち、少ない方である50,000円（ｃ）を積み立てます。</p>
        <p>よって、ａとｃの組み合わせが正解です。</p>
      </div>
    )
  },
  {
    id: 5,
    year: "令和3年 第3問",
    title: "固定資産除却",
    question: "備品(取得日:2018年4月1日、取得原価:800,000円、償却方法:定率法(償却率年25%)、記帳方法:間接法、決算日:3月31日)が不要となり、2020年3月31日に除却した。なお、除却した備品の評価額は250,000円である。固定資産除却損として、最も適切なものはどれか。",
    choices: [
      "100,000円",
      "150,000円",
      "200,000円",
      "250,000円"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ウ</p>
        <p>定率法の減価償却費 ＝ (取得原価 － 減価償却累計額) × 償却率</p>
        <ul className="list-disc ml-5">
          <li>1年目の減価償却費 ＝ 800,000 × 25% ＝ 200,000円</li>
          <li>2年目の減価償却費 ＝ (800,000 － 200,000) × 25% ＝ 150,000円</li>
        </ul>
        <p>除却時点の簿価 ＝ 800,000 － (200,000 ＋ 150,000) ＝ 450,000円</p>
        <p>固定資産除却損 ＝ 簿価 450,000 － 評価額 250,000 ＝ 200,000円</p>
      </div>
    )
  },
  {
    id: 6,
    year: "令和2年 第8問",
    title: "無形固定資産の会計",
    question: "無形固定資産の会計に関する記述として、最も適切なものはどれか。",
    choices: [
      "自社が長年にわたり築き上げたブランドにより、同業他社に比べ高い収益性を獲得している場合には、これを無形固定資産に計上することができる。",
      "自社の研究開発活動により特許権を取得した場合には、それまでの年度に支出された研究開発費を戻し入れ、無形固定資産として計上しなければならない。",
      "受注制作のソフトウェアの制作費は、請負工事の会計処理に準じて処理され、無形固定資産に計上されない。",
      "のれんとして資産計上された金額は、最長10年にわたり、規則的に償却される。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ウ</p>
        <p><strong>アは不適切：</strong>自社が獲得している収益性のあるブランド等を自己創設のれんとして無形固定資産に計上することは認められていません。</p>
        <p><strong>イは不適切：</strong>研究開発費は発生した期の費用（一般管理費等）として計上し、後から特許権を取得したとしても、過去の費用を戻し入れて資産計上することはしません。</p>
        <p><strong>ウは適切：</strong>受注制作のソフトウェアの制作費用は、請負工事の会計処理に準じて処理（工事進行基準など）され、無形固定資産（自社利用や市場販売目的など）には計上されません。</p>
        <p><strong>エは不適切：</strong>のれんの償却は最長20年です。</p>
      </div>
    )
  },
  {
    id: 7,
    year: "平成30年 第1問",
    title: "3伝票制",
    question: "商品120,000円を売り上げ、代金のうち30,000円を現金で受け取り、残額を掛けとした。入金伝票に「売掛金 30,000」と起票した場合、振替伝票はどのように記入すべきか。なお、3伝票制が用いられている。",
    choices: [
      "売掛金 90,000 / 売上 90,000",
      "売掛金 120,000 / 売上 120,000",
      "現金 30,000, 売掛金 90,000 / 売上 120,000",
      "現金 90,000, 売掛金 30,000 / 売上 120,000"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：イ</p>
        <p>取引の全体の仕訳は以下のようになります。<br/>(借) 現金 30,000, 売掛金 90,000 / (貸) 売上 120,000</p>
        <p>入金伝票に「(貸方) 売掛金 30,000」と記載されているということは、裏で「(借方) 現金 30,000 / (貸方) 売掛金 30,000」という仕訳が切られている（擬制取引）ことを意味します。</p>
        <p>これは、いったん全額を売掛金として売上を計上し、その後一部を現金で回収したとみなす方法です。</p>
        <p>したがって、振替伝票では全額を掛け売りした仕訳を切る必要があります。<br/>(借) 売掛金 120,000 / (貸) 売上 120,000</p>
      </div>
    )
  },
  {
    id: 8,
    year: "平成30年 第5問",
    title: "ソフトウェア会計",
    question: "ソフトウェアの会計処理および開示に関する記述として、最も適切なものはどれか。",
    choices: [
      "自社利用目的のソフトウェアのうち、将来の収益獲得または費用削減が確実であるものについては、機械装置等に組み込まれたものを除き、その取得に要した費用を無形固定資産として計上する。",
      "市場販売を目的とするソフトウェアの製品マスターが完成するまでに要した制作費は、最初に製品化されたときに無形固定資産として計上する。",
      "受注制作のソフトウェアは、その制作に要した費用を無形固定資産として計上する。",
      "無形固定資産として計上したソフトウェアは規則的な償却を行わず、価値の低下時に減損処理する。"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ア</p>
        <p><strong>アは適切：</strong>自社利用ソフトウェアで、将来の収益獲得や費用削減が確実なものは、無形固定資産として計上します。</p>
        <p><strong>イは不適切：</strong>市場販売目的のソフトウェアは、製品マスター完成までにかかった費用は「研究開発費」として費用処理されます。完成後の著しくない機能改良などが無形固定資産となります。</p>
        <p><strong>ウは不適切：</strong>受注制作ソフトウェアの制作費は、仕掛品などを経て売上原価として処理され、無形固定資産にはなりません。</p>
        <p><strong>エは不適切：</strong>無形固定資産として計上されたソフトウェアは、一般的に利用可能期間（原則5年以内）にわたり規則的に償却されます。</p>
      </div>
    )
  },
  {
    id: 9,
    year: "平成30年 第7問",
    title: "損益計算における費用と収益の認識基準",
    question: "4月20日：7月開講予定のセミナー（全10回、50,000円／回）の受講料総額500,000円を現金で受け取った。\n5月30日：全10回分のテキスト作成のため現金250,000円を支出した。\n12月31日（決算日）：全10回のうち6回が終了していた。\n計上される収益および費用の金額の組み合わせとして、最も適切なものを選べ。",
    choices: [
      "収益：300,000円　費用：150,000円",
      "収益：300,000円　費用：250,000円",
      "収益：500,000円　費用：150,000円",
      "収益：500,000円　費用：250,000円"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ア</p>
        <p>収益は「実現主義」、費用は「発生主義」および「費用収益対応の原則」に基づいて認識されます。</p>
        <p><strong>収益：</strong>決算日においてセミナーは6回分終了しているため、実現した収益は 50,000円 × 6回 ＝ 300,000円 となります。</p>
        <p><strong>費用：</strong>全10回分のテキスト作成費250,000円を支出していますが、費用収益対応の原則に基づき、当期に実現した収益（6回分）に対応する部分だけを計上します。<br/>250,000円 × (6回 / 10回) ＝ 150,000円</p>
      </div>
    )
  },
  {
    id: 10,
    year: "令和5年 第7問",
    title: "剰余金の配当",
    question: "剰余金の配当と処分に関する記述として、最も適切なものはどれか。",
    choices: [
      "株式会社は、1事業年度につき、中間配当と期末配当の最大2回の配当を行うことができる。",
      "株式会社は、資本剰余金を原資とする配当を行うことはできない。",
      "取締役会設置会社は、取締役会の決議によって中間配当を実施することができる旨を定款で定めることができる。",
      "役員賞与を支払う場合、その10分の1の額を利益準備金として積み立てなければならない。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ウ</p>
        <p><strong>アは不適切：</strong>会社法上、剰余金の配当は株主総会の決議等により何度でも行うことができます（回数制限なし）。</p>
        <p><strong>イは不適切：</strong>その他資本剰余金を原資とする配当も可能です。</p>
        <p><strong>ウは適切：</strong>取締役会設置会社は、1事業年度に1回に限り、取締役会の決議により中間配当を行うことができる旨を定款で定めることができます。</p>
        <p><strong>エは不適切：</strong>剰余金の配当を行う場合には準備金の積立が必要ですが、役員賞与（費用処理される）の支払いに対して準備金を積み立てる規定はありません。</p>
      </div>
    )
  },
  {
    id: 11,
    year: "令和5年 第2問",
    title: "収益認識基準",
    question: "8/12: 商品B(25,000円)と商品C(35,000円)を販売する契約を締結。代金60,000円は両方を引き渡した後に請求。商品BとCの引き渡しは独立した履行義務。商品Bは直ちに引き渡した。\n8/25: 商品Cを引き渡した。請求書を送付予定。\nこの取引の仕訳として適切なものはどれか。",
    choices: [
      "8/12 (借)契約資産 25,000 (貸)売上 25,000\n8/25 (借)売掛金 60,000 (貸)契約資産 25,000, 売上 35,000",
      "8/12 (借)契約資産 25,000 (貸)契約負債 25,000\n8/25 (借)売掛金 60,000 (貸)売上 60,000, 契約負債 25,000 (借)契約資産 25,000",
      "8/12 (借)契約資産 60,000 (貸)売上 60,000\n8/25 (借)売掛金 60,000 (貸)契約資産 60,000",
      "8/12 (借)契約資産 60,000 (貸)売上 25,000, 契約負債 35,000\n8/25 は仕訳なし"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ア</p>
        <p>新収益認識基準では、履行義務を充足した時点（商品を引き渡した時点）で収益を認識します。</p>
        <p><strong>8月12日の処理：</strong>商品Bのみを引き渡したため、商品Bの収益25,000円を認識します。しかし、代金の請求権は商品Cの引き渡し後に発生するという条件があるため、無条件の請求権である「売掛金」ではなく「契約資産」として計上します。<br/>(借)契約資産 25,000 / (貸)売上 25,000</p>
        <p><strong>8月25日の処理：</strong>商品Cを引き渡したことで、商品Cの収益35,000円を認識します。同時に、すべての履行義務が満たされ、全体の代金60,000円に対する無条件の請求権が発生したため、契約資産を売掛金に振り替えます。<br/>(借)売掛金 60,000 / (貸)契約資産 25,000, 売上 35,000</p>
      </div>
    )
  },
  {
    id: 12,
    year: "令和4年 第3問",
    title: "収益認識基準（特殊商品販売）",
    question: "収益認識のタイミングとして、最も適切なものはどれか。",
    choices: [
      "委託販売において、商品を代理店に発送した時点",
      "割賦販売において、商品を引き渡した時点",
      "試用販売において、試用のために商品を発送した時点",
      "予約販売において、商品の販売前に予約を受けた時点"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：イ</p>
        <p><strong>アは不適切：</strong>委託販売は、受託者（代理店）が商品を第三者に販売した時点で収益を認識します。</p>
        <p><strong>イは適切：</strong>割賦販売においても、新収益認識基準の下では原則として商品の引き渡し時点で収益を認識します（回収基準や割賦基準は廃止されました）。</p>
        <p><strong>ウは不適切：</strong>試用販売は、顧客が商品の買い取りの意思表示（買上意思表示）を行った時点で収益を認識します。</p>
        <p><strong>エは不適切：</strong>予約販売は、予約を受けた時点ではなく、実際に商品を顧客に引き渡した時点で収益を認識します。</p>
      </div>
    )
  },
  {
    id: 13,
    year: "令和3年 第6問",
    title: "収益認識基準",
    question: "収益に関する記述として、最も適切なものはどれか。",
    choices: [
      "検収基準は、契約の解消や返品リスクがない場合に採用される。",
      "出荷基準よりも収益認識のタイミングが早いのは、引渡基準である。",
      "長期請負工事については、工事進行基準を適用しなければならない。",
      "販売基準は実現主義に基づいている。"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：エ</p>
        <p><strong>アは不適切：</strong>検収基準は、取引先が検収（確認）をした時点で収益を認識します。リスクの有無だけで採用されるわけではありません。</p>
        <p><strong>イは不適切：</strong>引渡基準は商品が到着した時点なので、発送した時点である出荷基準よりも認識タイミングは遅くなります。</p>
        <p><strong>ウは不適切：</strong>長期請負工事において、進捗部分について成果の確実性が認められない場合には、工事進行基準ではなく工事完成基準などが適用されます（必ずしも進行基準とは限らない）。</p>
        <p><strong>エは適切：</strong>商品販売等による収益の認識（販売基準）は、実現主義（財貨の引渡しと対価の受領）に基づいています。</p>
      </div>
    )
  },
  {
    id: 14,
    year: "令和4年 第11問",
    title: "減価償却費",
    question: "当期はX5年4月1日からX6年3月31日の1年間である。決算整理前の機械勘定の残高は216,000円であるが、当期より直接控除法から間接控除法に記帳方法を変更する。この機械はX1年4月1日に取得したものであり、耐用年数10年、残存価額をゼロとする定額法により減価償却を行っている。この機械の取得原価として、最も適切なものはどれか。",
    choices: [
      "216,000円",
      "237,600円",
      "360,000円",
      "432,000円"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-800">
        <p>解答：ウ</p>
        <p>直接控除法で記帳されているため、決算整理前（X5年3月31日時点）の機械勘定残高216,000円は、取得原価から過去の減価償却費累計額が直接差し引かれたあとの「未償却残高（簿価）」です。</p>
        <p>X1年4月1日の取得からX5年3月31日まで、丸4年が経過しています。</p>
        <p>定額法（耐用年数10年、残存価額ゼロ）の場合、毎年の償却費は取得原価の1/10（10%）です。</p>
        <p>4年経過しているので、取得原価の4/10（40%）が償却済みであり、残高216,000円は取得原価の6/10（60%）に相当します。</p>
        <p>取得原価 × 0.6 = 216,000円<br/>取得原価 = 216,000円 ÷ 0.6 = 360,000円</p>
      </div>
    )
  }
];

// ==========================================
// Main App Component
// ==========================================
export default function App() {
  const [step, setStep] = useState('login'); // login, resume_prompt, menu, quiz, result, history
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  // User Data State
  const [historyData, setHistoryData] = useState({});
  const [reviewData, setReviewData] = useState({});
  const [progressData, setProgressData] = useState({ index: 0, mode: null });

  // Quiz State
  const [quizMode, setQuizMode] = useState('all'); // all, wrong, review
  const [currentList, setCurrentList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [sessionCorrectCount, setSessionCorrectCount] = useState(0);

  useEffect(() => {
    // Initial anonymous sign in
    const signIn = async () => {
      try {
        await signInAnonymously(auth);
        console.log("Firebase Auth initialized.");
      } catch (e) {
        console.error("Auth error:", e);
      }
    };
    signIn();
  }, []);

  // ----------------------------------------
  // Data Fetching & Saving
  // ----------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      setErrorMsg("合言葉（ユーザーID）を入力してください");
      return;
    }
    setLoading(true);
    setErrorMsg('');
    try {
      const docRef = doc(db, APP_ID, userId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        setHistoryData(data.history || {});
        setReviewData(data.review || {});
        
        const pIndex = data.progressIndex || 0;
        const pMode = data.progressMode || null;
        setProgressData({ index: pIndex, mode: pMode });

        console.log("Data loaded:", data);

        if (pIndex > 0 && pMode) {
          setStep('resume_prompt');
        } else {
          setStep('menu');
        }
      } else {
        console.log("No previous data found.");
        setHistoryData({});
        setReviewData({});
        setProgressData({ index: 0, mode: null });
        setStep('menu');
      }
    } catch (e) {
      console.error("Fetch error:", e);
      setErrorMsg("データの読み込みに失敗しました。");
    } finally {
      setLoading(false);
    }
  };

  const saveData = async (newData) => {
    try {
      const docRef = doc(db, APP_ID, userId);
      await setDoc(docRef, newData, { merge: true });
      console.log("Data saved:", newData);
    } catch (e) {
      console.error("Save error:", e);
    }
  };

  const toggleReview = async (qId) => {
    const newVal = !reviewData[qId];
    const newReviewData = { ...reviewData, [qId]: newVal };
    setReviewData(newReviewData);
    await saveData({ review: newReviewData });
  };

  // ----------------------------------------
  // Quiz Flow Logic
  // ----------------------------------------
  const startQuiz = (mode, startIndex = 0) => {
    let list = [];
    if (mode === 'all') {
      list = [...questions];
    } else if (mode === 'wrong') {
      list = questions.filter(q => historyData[q.id] === 'wrong' || !historyData[q.id]);
    } else if (mode === 'review') {
      list = questions.filter(q => reviewData[q.id]);
    }

    if (list.length === 0) {
      alert("該当する問題がありません。");
      return;
    }

    setQuizMode(mode);
    setCurrentList(list);
    setCurrentIndex(startIndex);
    setIsAnswered(false);
    setSelectedChoice(null);
    setSessionCorrectCount(0); // This count is for UI feedback in the current session
    setStep('quiz');
  };

  const resumeQuiz = () => {
    startQuiz(progressData.mode, progressData.index);
  };

  const resetProgressAndStart = (mode) => {
    saveData({ progressIndex: 0, progressMode: null });
    setProgressData({ index: 0, mode: null });
    startQuiz(mode, 0);
  };

  const handleChoiceClick = async (idx) => {
    if (isAnswered) return;
    
    setSelectedChoice(idx);
    setIsAnswered(true);

    const currentQ = currentList[currentIndex];
    const isCorrect = idx === currentQ.answerIndex;

    // Update session count
    if (isCorrect) setSessionCorrectCount(prev => prev + 1);

    // Update History
    const newHistoryData = { ...historyData, [currentQ.id]: isCorrect ? 'correct' : 'wrong' };
    setHistoryData(newHistoryData);

    // Save history and current progress index
    await saveData({ 
      history: newHistoryData,
      progressIndex: currentIndex,
      progressMode: quizMode
    });
  };

  const handleNext = async () => {
    if (currentIndex + 1 < currentList.length) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setIsAnswered(false);
      setSelectedChoice(null);
      // Save progress
      await saveData({ progressIndex: nextIndex, progressMode: quizMode });
    } else {
      // Finished
      await saveData({ progressIndex: 0, progressMode: null });
      setProgressData({ index: 0, mode: null });
      setStep('result');
    }
  };

  const goHome = async () => {
    // Save current index if returning mid-quiz
    if (step === 'quiz') {
       await saveData({ progressIndex: currentIndex, progressMode: quizMode });
    }
    setStep('menu');
  };

  // ----------------------------------------
  // Render Helpers
  // ----------------------------------------
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <RefreshCw className="w-10 h-10 animate-spin text-blue-500 mb-4" />
          <p className="text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* === HEADER === */}
        {step !== 'login' && (
          <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
            <h1 className="text-lg font-bold flex items-center gap-2">
              <BookOpen size={20} />
              過去問セレクト演習 簿記
            </h1>
            {step !== 'menu' && step !== 'resume_prompt' && (
              <button onClick={goHome} className="p-2 hover:bg-blue-700 rounded-full transition">
                <Home size={20} />
              </button>
            )}
          </div>
        )}

        <div className="p-4 md:p-6">
          {/* === LOGIN STEP === */}
          {step === 'login' && (
            <div className="space-y-6 text-center py-8">
              <BookOpen className="w-16 h-16 mx-auto text-blue-600" />
              <h2 className="text-2xl font-bold">学習アプリへようこそ</h2>
              <p className="text-gray-600 text-sm">合言葉（ユーザーID）を入力して履歴を同期しましょう。</p>
              
              <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
                <input
                  type="text"
                  placeholder="合言葉を入力"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition"
                >
                  学習を始める
                </button>
              </form>
            </div>
          )}

          {/* === RESUME PROMPT STEP === */}
          {step === 'resume_prompt' && (
            <div className="space-y-6 py-6 text-center">
              <div className="bg-blue-50 p-4 rounded-lg inline-block text-blue-800 mb-4">
                <Clock className="w-12 h-12 mx-auto mb-2" />
                <h3 className="font-bold text-lg">前回の続きから再開しますか？</h3>
                <p className="text-sm mt-2">
                  前回は <strong>{progressData.mode === 'all' ? 'すべての問題' : progressData.mode === 'wrong' ? '前回不正解のみ' : '要復習のみ'}</strong> の<br/>
                  【第{progressData.index + 1}問目】で中断しています。
                </p>
              </div>
              <div className="flex flex-col space-y-3 max-w-sm mx-auto">
                <button 
                  onClick={resumeQuiz}
                  className="bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  続きから再開する <ArrowRight size={18} />
                </button>
                <button 
                  onClick={() => setStep('menu')}
                  className="bg-gray-200 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-300"
                >
                  メニューへ移動（履歴をリセットして開始）
                </button>
              </div>
            </div>
          )}

          {/* === MENU STEP === */}
          {step === 'menu' && (
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-bold border-b-2 border-blue-600 inline-block pb-1">出題モード選択</h2>
                <p className="text-gray-500 text-sm">ユーザーID: {userId}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-1">
                <button 
                  onClick={() => resetProgressAndStart('all')}
                  className="flex items-center p-4 border-2 border-blue-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition text-left group"
                >
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                    <List size={24} />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-bold text-lg">すべての問題</div>
                    <div className="text-sm text-gray-500">全{questions.length}問から出題します</div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-blue-500" />
                </button>

                <button 
                  onClick={() => resetProgressAndStart('wrong')}
                  className="flex items-center p-4 border-2 border-red-200 rounded-xl hover:border-red-500 hover:bg-red-50 transition text-left group"
                >
                  <div className="bg-red-100 p-3 rounded-full text-red-600 group-hover:bg-red-600 group-hover:text-white transition">
                    <X size={24} />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-bold text-lg">前回不正解・未回答のみ</div>
                    <div className="text-sm text-gray-500">苦手な問題に集中して挑戦します</div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-red-500" />
                </button>

                <button 
                  onClick={() => resetProgressAndStart('review')}
                  className="flex items-center p-4 border-2 border-yellow-200 rounded-xl hover:border-yellow-500 hover:bg-yellow-50 transition text-left group"
                >
                  <div className="bg-yellow-100 p-3 rounded-full text-yellow-600 group-hover:bg-yellow-500 group-hover:text-white transition">
                    <BookOpen size={24} />
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="font-bold text-lg">要復習の問題のみ</div>
                    <div className="text-sm text-gray-500">チェックをつけた問題を復習します</div>
                  </div>
                  <ChevronRight className="text-gray-400 group-hover:text-yellow-500" />
                </button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button 
                  onClick={() => setStep('history')}
                  className="w-full bg-gray-800 text-white font-bold py-3 rounded-lg hover:bg-gray-900 transition flex items-center justify-center gap-2"
                >
                  学習履歴を確認する
                </button>
              </div>
            </div>
          )}

          {/* === QUIZ STEP === */}
          {step === 'quiz' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center text-sm font-bold text-gray-500">
                <span>問題 {currentIndex + 1} / {currentList.length}</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">{currentList[currentIndex]?.year}</span>
              </div>

              <div className="text-lg font-bold border-l-4 border-blue-600 pl-3">
                {currentList[currentIndex]?.title}
              </div>

              <div className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                {currentList[currentIndex]?.question}
              </div>

              <div className="space-y-3 mt-6">
                {currentList[currentIndex]?.choices.map((choice, idx) => {
                  let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all flex items-start gap-3 ";
                  let icon = null;

                  if (!isAnswered) {
                    btnClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white";
                  } else {
                    if (idx === currentList[currentIndex].answerIndex) {
                      btnClass += "border-green-500 bg-green-50 font-bold";
                      icon = <Check className="text-green-500 flex-shrink-0 mt-0.5" size={20} />;
                    } else if (idx === selectedChoice) {
                      btnClass += "border-red-500 bg-red-50 text-red-900";
                      icon = <X className="text-red-500 flex-shrink-0 mt-0.5" size={20} />;
                    } else {
                      btnClass += "border-gray-200 bg-gray-50 opacity-50";
                    }
                  }

                  return (
                    <button 
                      key={idx} 
                      onClick={() => handleChoiceClick(idx)}
                      disabled={isAnswered}
                      className={btnClass}
                    >
                      {icon || <div className="w-5 h-5 flex-shrink-0 mt-0.5 border border-gray-400 rounded-full"></div>}
                      <span>{choice}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explanation Section */}
              {isAnswered && (
                <div className="mt-8 animate-fade-in-up">
                  <div className={`p-4 rounded-t-lg font-bold text-white flex items-center justify-between ${selectedChoice === currentList[currentIndex].answerIndex ? 'bg-green-600' : 'bg-red-600'}`}>
                    <div className="flex items-center gap-2">
                      {selectedChoice === currentList[currentIndex].answerIndex ? <Check size={24} /> : <X size={24} />}
                      <span>{selectedChoice === currentList[currentIndex].answerIndex ? '正解！' : '不正解...'}</span>
                    </div>
                    
                    <label className="flex items-center gap-2 cursor-pointer bg-black/20 px-3 py-1.5 rounded hover:bg-black/30 transition text-sm">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 accent-white"
                        checked={!!reviewData[currentList[currentIndex].id]}
                        onChange={() => toggleReview(currentList[currentIndex].id)}
                      />
                      要復習
                    </label>
                  </div>
                  
                  <div className="bg-white border-x border-b border-gray-300 rounded-b-lg p-5">
                    <h4 className="font-bold text-lg mb-4 border-b pb-2">解説</h4>
                    {currentList[currentIndex]?.explanation}
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleNext}
                      className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      {currentIndex + 1 < currentList.length ? '次の問題へ' : '結果を見る'} <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* === RESULT STEP === */}
          {step === 'result' && (
            <div className="text-center space-y-6 py-8">
              <h2 className="text-3xl font-bold text-blue-800">演習完了！</h2>
              
              <div className="bg-gray-100 rounded-xl p-8 max-w-sm mx-auto">
                <p className="text-gray-500 mb-2">正答数</p>
                <div className="text-5xl font-extrabold text-gray-800">
                  <span className="text-blue-600">{sessionCorrectCount}</span> <span className="text-2xl text-gray-500">/ {currentList.length}</span>
                </div>
                <p className="mt-4 font-bold text-lg text-gray-700">
                  正答率: {Math.round((sessionCorrectCount / currentList.length) * 100)}%
                </p>
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <button 
                  onClick={() => setStep('menu')}
                  className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition"
                >
                  メニューへ戻る
                </button>
              </div>
            </div>
          )}

          {/* === HISTORY STEP === */}
          {step === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-6 border-b pb-2">
                <button onClick={() => setStep('menu')} className="text-gray-500 hover:text-gray-800"><ChevronLeft /></button>
                <h2 className="text-xl font-bold">学習履歴</h2>
              </div>

              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                  <thead className="bg-gray-100 text-gray-600 font-bold border-b">
                    <tr>
                      <th className="p-3 w-12 text-center">No</th>
                      <th className="p-3">テーマ</th>
                      <th className="p-3 w-24 text-center">前回結果</th>
                      <th className="p-3 w-20 text-center">要復習</th>
                    </tr>
                  </thead>
                  <tbody>
                    {questions.map((q, idx) => (
                      <tr key={q.id} className="border-b last:border-0 hover:bg-gray-50">
                        <td className="p-3 text-center text-gray-500">{idx + 1}</td>
                        <td className="p-3 font-medium">{q.title}</td>
                        <td className="p-3 text-center">
                          {historyData[q.id] === 'correct' ? (
                            <span className="text-green-600 font-bold flex justify-center"><Check size={18} /></span>
                          ) : historyData[q.id] === 'wrong' ? (
                            <span className="text-red-500 font-bold flex justify-center"><X size={18} /></span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="p-3 text-center">
                          <input 
                            type="checkbox"
                            className="w-5 h-5 accent-yellow-500 cursor-pointer"
                            checked={!!reviewData[q.id]}
                            onChange={() => toggleReview(q.id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}