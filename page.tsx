// 依賴環境: React, Tailwind CSS (適用於 Next.js)
// 核心邏輯: 台灣營業稅率 5%，採四捨五入計算
// 使用方式: 將 /public/invoice-bg.jpg 替換為實際的三聯式/二聯式發票空圖

import React, { useState } from 'react';

export default function InvoiceCalculator() {
  const [salesAmount, setSalesAmount] = useState<number | ''>('');
  const [taxAmount, setTaxAmount] = useState<number | ''>('');
  const [totalAmount, setTotalAmount] = useState<number | ''>('');

  // 處理銷售額（未稅）輸入，自動計算稅額與總計
  const handleSalesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      resetFields();
      return;
    }
    const tax = Math.round(val * 0.05);
    setSalesAmount(val);
    setTaxAmount(tax);
    setTotalAmount(val + tax);
  };

  // 處理總計（含稅）輸入，自動回推銷售額與稅額
  const handleTotalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      resetFields();
      return;
    }
    const sales = Math.round(val / 1.05);
    const tax = val - sales;
    setTotalAmount(val);
    setSalesAmount(sales);
    setTaxAmount(tax);
  };

  const resetFields = () => {
    setSalesAmount('');
    setTaxAmount('');
    setTotalAmount('');
  };

  return (
    // 容器大小需依據實際發票圖檔比例調整
    <div className="relative w-[600px] h-[800px] bg-gray-200 mx-auto border border-gray-400 shadow-lg">
      
      {/* 發票底圖 */}
      <img 
        src="/invoice-bg.jpg" 
        alt="發票底圖" 
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 pointer-events-none"
      />
      
      {/* 絕對定位輸入層 (Z-index 需高於底圖) */}
      <div className="absolute inset-0 z-10 flex flex-col p-12 font-mono text-gray-900">
        
        {/* 文字輸入區：買受人與統編 */}
        <div className="mt-[120px] flex items-center gap-2">
          {/* bg-white/60 確保文字在複雜底圖上可讀 */}
          <label className="w-24 text-right font-bold bg-white/60 px-1 rounded">買受人</label>
          <input 
            type="text" 
            className="border-b border-gray-600 bg-transparent px-2 outline-none w-64 text-lg focus:bg-white/50 transition-colors" 
          />
        </div>
        
        <div className="mt-6 flex items-center gap-2">
          <label className="w-24 text-right font-bold bg-white/60 px-1 rounded">統一編號</label>
          <input 
            type="text" 
            maxLength={8} 
            className="border-b border-gray-600 bg-transparent px-2 outline-none w-64 text-lg tracking-[0.5em] focus:bg-white/50 transition-colors" 
          />
        </div>

        {/* 數字計算區：依據發票欄位實際位置，調整 mt-auto 或絕對座標 (top/left) */}
        <div className="mt-auto mb-[80px] flex flex-col gap-6 w-full max-w-[350px] ml-auto">
          
          <div className="flex items-center justify-between">
            <label className="font-bold bg-white/60 px-1 rounded">銷售額</label>
            <input 
              type="number" 
              value={salesAmount} 
              onChange={handleSalesChange}
              className="border border-gray-400 bg-white/80 px-2 py-1 outline-none w-48 text-right text-lg focus:ring-2 focus:ring-blue-500"
              placeholder="未稅金額"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="font-bold bg-white/60 px-1 rounded">營業稅</label>
            <input 
              type="number" 
              value={taxAmount} 
              readOnly
              // 稅額通常自動計算，設為唯讀
              className="border border-gray-300 bg-gray-200/80 px-2 py-1 outline-none w-48 text-right text-lg text-gray-600 cursor-not-allowed"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="font-bold bg-white/60 px-1 rounded text-red-700">總計</label>
            <input 
              type="number" 
              value={totalAmount} 
              onChange={handleTotalChange}
              className="border border-gray-400 bg-white/80 px-2 py-1 outline-none w-48 text-right text-lg font-bold focus:ring-2 focus:ring-red-500"
              placeholder="含稅金額"
            />
          </div>
          
        </div>
      </div>
    </div>
  );
}
