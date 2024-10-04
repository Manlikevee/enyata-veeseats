import React from 'react'
import Layout from "@/components/dashboard/Layout";
import Titleddiv from "@/components/Titleddiv";
import Link from 'next/link';

const generateRandomInvoices = (numInvoices) => {
    const invoices = [];
    for (let i = 0; i < numInvoices; i++) {
      const invoiceNumber = `${Math.floor(Math.random() * 100000)}`;
      const date = new Date().toLocaleDateString();
      const plan = ['Basic Plan', 'Premium Plan', 'Pro Plan'][Math.floor(Math.random() * 3)];
      const amount = `$${(Math.random() * 1000 + 200).toFixed(2)}`;
      const status = ['Paid', 'Unpaid'][Math.floor(Math.random() * 2)];
      invoices.push({ invoiceNumber, date, plan, amount, status });
    }
    return invoices;
  };
const page = () => {
    const invoices = generateRandomInvoices(7);
  return (
    <Layout>
              <div className="dashboard gaptransiton">
               <p></p>
               <div>
               <h4>Billing</h4>
               <div className="overview-text-subheader">
               Effortlessly handle your billing and invoices right here.
               </div>
               </div>
            
              
            <div className="subgrid">
                <div className="subgridbox">
                    <div className="subheader">
                    Current Plan Summary  <div className="mypagebtn">Upgrade</div>
                    </div>
                    <div className="subbody">
                    <div className="checkbox-group">
                    <div className="profileitem">
                    <div className="profvalue">PLAN NAME </div>
                    <div className="proflabel">Growth Plan </div>
                
                    </div> 
                    <div className="profileitem">
                    <div className="profvalue">BILLING CYCLE </div>
                    <div className="proflabel">Monthly </div>
            
                    </div>

                    <div className="profileitem">
                    <div className="profvalue">PLAN COST </div>
                    <div className="proflabel">$5698 </div>
             
                    </div>
                    </div>
                    <small>Usage</small>
                    <small className='stxt'>4850 out of 5k monthly active users</small>
                    <progress id="file" value="32" max="100"> 32% </progress>
                    </div>
               
                </div>
                <div className="subgridbox">
                    <div className="subheader">
                    Payment Method  <div className="mypagebtn">Add New</div>
                    </div>
                    <div className="subbody ac">


      <div className="billingflex">
      <div className="billinghead">

<img src="/mas.png" alt="" />
<div className="billingtext">
<div className="cardname">Master Card</div>
<div className="cardnum">**** **** **** 4002</div>
<div className="exp">Expiry on 20/2024</div>
</div>
</div>
        
        </div>  



                    </div>
               
                </div>
            </div>


            <div>
               <h4>Invoice</h4>
               <div className="overview-text-subheader">
               Effortlessly handle your billing and invoices right here.
               </div>
               </div>

<div className="invoicetableflex">
<div className="invoicetable tablehead">
                <div className="invdata">Invoice ID</div>
                <div className="invdata">Date</div>
                <div className="invdata">Plan</div>
                <div className="invdata">Amount</div>
                <div className="invdata">Status ID</div>
               </div>

               <div className="invoicetable">
                <div className="invdata">#23456</div>
                <div className="invdata">23 Jan 2023</div>
                <div className="invdata">Basic Plan</div>
                <div className="invdata">$1200</div>
                <div className="invdata"><span className='paid'>Paid</span></div>
               </div>

               {invoices.map((invoice, index) => (
        <Link href={`/services/transaction/${invoice.invoiceNumber}`} key={index} className="invoicetable">
          <div className="invdata">{invoice.invoiceNumber}</div>
          <div className="invdata">{invoice.date}</div>
          <div className="invdata">{invoice.plan}</div>
          <div className="invdata">{invoice.amount}</div>
          <div className="invdata">
            <span className={invoice.status === 'Paid' ? 'paid' : 'unpaid'}>{invoice.status}</span>
          </div>
        </Link>
      ))}
               
</div>
 
              </div>
   

    </Layout>
  )
}

export default page