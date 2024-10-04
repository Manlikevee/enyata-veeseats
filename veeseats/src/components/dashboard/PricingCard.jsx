import Link from 'next/link';
import React from 'react';

const PricingCard = ({ title, price, details, features, onClick, index }) => {
  const handleButtonClick = () => {
    console.log(price);
    if (onClick) onClick(index);
  };

  return (
    <div className={`pricingcard ${title.toLowerCase().replace(' ', ' ')}`}>
      <div className="pricingcardtop">
        <div className="pricepill">{title}</div>
        <div className="priceamount">₦ {price}</div>
        <div className="pricedeets">{details}</div>
        <Link href={'/user-profile'} className="planbtn" >
          Get started
          <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      </div>
      <div className="pricebottom">
        {features.map((feature, index) => (
          <div className="pricelist" key={index}>
            <div className="priceicon">
              <span className="material-symbols-outlined">check</span>
            </div>
            <div className="pricedata">{feature}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
