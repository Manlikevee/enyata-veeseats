import React from 'react'
import PlainTextRenderer from './PlainTextRenderer';

const Dashboardroles = ({job}) => {

 const companies =   [
        {
            "companyName": "Contentful",
            "imagePath": "/images/Company=Contentful.png"
        },
        {
            "companyName": "Culture Amp",
            "imagePath": "/images/Company=Culture Amp.png"
        },
        {
            "companyName": "Customer",
            "imagePath": "/images/Company=Customer.io.png"
        },
        {
            "companyName": "Databricks",
            "imagePath": "/images/Company=Databricks.png"
        },
        {
            "companyName": "Descript",
            "imagePath": "/images/Company=Descript.png"
        },
        {
            "companyName": "Discord",
            "imagePath": "/images/Company=Discord.png"
        },
        {
            "companyName": "Docker",
            "imagePath": "/images/Company=Docker.png"
        },
        {
            "companyName": "Docusign",
            "imagePath": "/images/Company=Docusign.png"
        },
        {
            "companyName": "DoorDash",
            "imagePath": "/images/Company=DoorDash.png"
        },
        {
            "companyName": "Dribbble",
            "imagePath": "/images/Company=Dribbble.png"
        },
        {
            "companyName": "Drips",
            "imagePath": "/images/Company=Drips.png"
        },
        {
            "companyName": "Dropbox",
            "imagePath": "/images/Company=Dropbox.png"
        },
        {
            "companyName": "Elastic",
            "imagePath": "/images/Company=Elastic.png"
        },
        {
            "companyName": "Evernote",
            "imagePath": "/images/Company=Evernote.png"
        },
        {
            "companyName": "Figma",
            "imagePath": "/images/Company=Figma.png"
        },
        {
            "companyName": "Fivetran",
            "imagePath": "/images/Company=Fivetran.png"
        },
        {
            "companyName": "Framer",
            "imagePath": "/images/Company=Framer.png"
        },
        {
            "companyName": "Freshworks",
            "imagePath": "/images/Company=Freshworks.png"
        },
        {
            "companyName": "Ghost",
            "imagePath": "/images/Company=Ghost.png"
        },
        {
            "companyName": "GitHub",
            "imagePath": "/images/Company=GitHub.png"
        },
        {
            "companyName": "Gitlab",
            "imagePath": "/images/Company=Gitlab.png"
        },
        {
            "companyName": "Gong",
            "imagePath": "/images/Company=Gong.png"
        },
        {
            "companyName": "Google",
            "imagePath": "/images/Company=Google.png"
        },
        {
            "companyName": "Grammarly",
            "imagePath": "/images/Company=Grammarly.png"
        },
        {
            "companyName": "Gumroad",
            "imagePath": "/images/Company=Gumroad.png"
        },
        {
            "companyName": "Gusto",
            "imagePath": "/images/Company=Gusto.png"
        },
        {
            "companyName": "HashiCorp",
            "imagePath": "/images/Company=HashiCorp.png"
        },
        {
            "companyName": "Hellosign",
            "imagePath": "/images/Company=Hellosign.png"
        },
        {
            "companyName": "Himalayas",
            "imagePath": "/images/Company=Himalayas.png"
        },
        {
            "companyName": "Hopin",
            "imagePath": "/images/Company=Hopin.png"
        },
        {
            "companyName": "Hotjar",
            "imagePath": "/images/Company=Hotjar.png"
        },
        {
            "companyName": "Hubspot",
            "imagePath": "/images/Company=Hubspot.png"
        },
        {
            "companyName": "Instagram",
            "imagePath": "/images/Company=Instagram.png"
        },
        {
            "companyName": "Intercom",
            "imagePath": "/images/Company=Intercom.png"
        },
        {
            "companyName": "InVision",
            "imagePath": "/images/Company=InVision.png"
        },
        {
            "companyName": "Lattice",
            "imagePath": "/images/Company=Lattice.png"
        },
        {
            "companyName": "LaunchDarkly",
            "imagePath": "/images/Company=LaunchDarkly.png"
        },
        {
            "companyName": "Linear",
            "imagePath": "/images/Company=Linear.png"
        },
        {
            "companyName": "Loom",
            "imagePath": "/images/Company=Loom.png"
        },
        {
            "companyName": "Mailchimp",
            "imagePath": "/images/Company=Mailchimp.png"
        },
        {
            "companyName": "Maze",
            "imagePath": "/images/Company=Maze.png"
        },
        {
            "companyName": "Medium",
            "imagePath": "/images/Company=Medium.png"
        },
        {
            "companyName": "Microsoft",
            "imagePath": "/images/Company=Microsoft.png"
        },
        {
            "companyName": "Miro",
            "imagePath": "/images/Company=Miro.png"
        },
        {
            "companyName": "Monday",
            "imagePath": "/images/Company=Monday.com.png"
        },
        {
            "companyName": "Monzo",
            "imagePath": "/images/Company=Monzo.png"
        },
        {
            "companyName": "Netflix",
            "imagePath": "/images/Company=Netflix.png"
        },
        {
            "companyName": "Notion",
            "imagePath": "/images/Company=Notion.png"
        },
        {
            "companyName": "Opendoor",
            "imagePath": "/images/Company=Opendoor.png"
        },
        {
            "companyName": "Outreach",
            "imagePath": "/images/Company=Outreach.png"
        },
        {
            "companyName": "PayPal",
            "imagePath": "/images/Company=PayPal.png"
        },
        {
            "companyName": "Pendo",
            "imagePath": "/images/Company=Pendo.png"
        },
        {
            "companyName": "Pipedrive",
            "imagePath": "/images/Company=Pipedrive.png"
        },
        {
            "companyName": "Postman",
            "imagePath": "/images/Company=Postman.png"
        },
        {
            "companyName": "Productboard",
            "imagePath": "/images/Company=Productboard.png"
        },
        {
            "companyName": "Razorpay",
            "imagePath": "/images/Company=Razorpay.png"
        },
        {
            "companyName": "Rippling",
            "imagePath": "/images/Company=Rippling.png"
        },
        {
            "companyName": "Segment",
            "imagePath": "/images/Company=Segment.png"
        },
        {
            "companyName": "Shopify",
            "imagePath": "/images/Company=Shopify.png"
        },
        {
            "companyName": "Slack",
            "imagePath": "/images/Company=Slack.png"
        },
        {
            "companyName": "Sonos",
            "imagePath": "/images/Company=Sonos.png"
        },
        {
            "companyName": "SpaceX",
            "imagePath": "/images/Company=SpaceX.png"
        },
        {
            "companyName": "Splunk",
            "imagePath": "/images/Company=Splunk.png"
        },
        {
            "companyName": "Spotify",
            "imagePath": "/images/Company=Spotify.png"
        },
        {
            "companyName": "Square",
            "imagePath": "/images/Company=Square.png"
        },
        {
            "companyName": "Squarespace",
            "imagePath": "/images/Company=Squarespace.png"
        },
        {
            "companyName": "Stripe",
            "imagePath": "/images/Company=Stripe.png"
        },
        {
            "companyName": "Tesla",
            "imagePath": "/images/Company=Tesla.png"
        },
        {
            "companyName": "Tinder",
            "imagePath": "/images/Company=Tinder.png"
        },
        {
            "companyName": "Toggle",
            "imagePath": "/images/Company=Toggle.png"
        },
        {
            "companyName": "Treehouse",
            "imagePath": "/images/Company=Treehouse.png"
        },
        {
            "companyName": "Trello",
            "imagePath": "/images/Company=Trello.png"
        },
        {
            "companyName": "Trustpilot",
            "imagePath": "/images/Company=Trustpilot.png"
        },
        {
            "companyName": "Twitch",
            "imagePath": "/images/Company=Twitch.png"
        },
        {
            "companyName": "Uber",
            "imagePath": "/images/Company=Uber.png"
        },
        {
            "companyName": "Upwork",
            "imagePath": "/images/Company=Upwork.png"
        },
        {
            "companyName": "Wealthsimple",
            "imagePath": "/images/Company=Wealthsimple.png"
        },
        {
            "companyName": "Webflow",
            "imagePath": "/images/Company=Webflow.png"
        },
        {
            "companyName": "Whatsapp",
            "imagePath": "/images/Company=Whatsapp.png"
        },
        {
            "companyName": "YouTube",
            "imagePath": "/images/Company=YouTube.png"
        },
        {
            "companyName": "Zapier",
            "imagePath": "/images/Company=Zapier.png"
        },
        {
            "companyName": "Zoom",
            "imagePath": "/images/Company=Zoom.png"
        },
        {
            "companyName": "ActiveCampaign",
            "imagePath": "/images/Company=ActiveCampaign.png"
        },
        {
            "companyName": "Adobe",
            "imagePath": "/images/Company=Adobe.png"
        },
        {
            "companyName": "Afterpay",
            "imagePath": "/images/Company=Afterpay.png"
        },
        {
            "companyName": "Airbnb",
            "imagePath": "/images/Company=Airbnb.png"
        },
        {
            "companyName": "Airtable",
            "imagePath": "/images/Company=Airtable.png"
        },
        {
            "companyName": "Airtasker",
            "imagePath": "/images/Company=Airtasker.png"
        },
        {
            "companyName": "Airwallex",
            "imagePath": "/images/Company=Airwallex.png"
        },
        {
            "companyName": "Amazon",
            "imagePath": "/images/Company=Amazon.png"
        },
        {
            "companyName": "Amplitude",
            "imagePath": "/images/Company=Amplitude.png"
        },
        {
            "companyName": "Asana",
            "imagePath": "/images/Company=Asana.png"
        },
        {
            "companyName": "Atlassian",
            "imagePath": "/images/Company=Atlassian.png"
        },
        {
            "companyName": "Attentive",
            "imagePath": "/images/Company=Attentive.png"
        },
        {
            "companyName": "Automattic",
            "imagePath": "/images/Company=Automattic.png"
        },
        {
            "companyName": "Basecamp",
            "imagePath": "/images/Company=Basecamp.png"
        },
        {
            "companyName": "Booking",
            "imagePath": "/images/Company=Booking.com.png"
        },
        {
            "companyName": "Braze",
            "imagePath": "/images/Company=Braze.png"
        },
        {
            "companyName": "BrowserStack",
            "imagePath": "/images/Company=BrowserStack.png"
        },
        {
            "companyName": "Calendly",
            "imagePath": "/images/Company=Calendly.png"
        },
        {
            "companyName": "Canva",
            "imagePath": "/images/Company=Canva.png"
        },
        {
            "companyName": "Carta",
            "imagePath": "/images/Company=Carta.png"
        },
        {
            "companyName": "Classpass",
            "imagePath": "/images/Company=Classpass.png"
        },
        {
            "companyName": "Clearbit",
            "imagePath": "/images/Company=Clearbit.png"
        },
        {
            "companyName": "Codecademy",
            "imagePath": "/images/Company=Codecademy.png"
        },
        {
            "companyName": "Coinbase",
            "imagePath": "/images/Company=Coinbase.png"
        }
    ]

    const getRandomCompany = () => {
        const randomIndex = Math.floor(Math.random() * companies.length);
        return companies[randomIndex];
      };
      const randomCompany = getRandomCompany();
  return (
<div className="drolecard">
    <div className="dheader">
        <div className="rolelogo">
        <img src={job?.organization?.logo} alt={job?.organization.logo} />
        </div>
        <div className="rolelocal">
<img src="/lod.png" alt="" width={'10px'} height={'13'} />
<small>Abuja, Nigeria</small>
        </div>
    </div>
    <div className="dtitle">
        <div className="rtitle">{job?.jobtitle}</div>
        <div className="dservice">{job?.jobcategory}</div>
    </div>
    <div className="dcontent">
    {job?.jobdescription && ( <PlainTextRenderer content={job?.jobdescription} />)}
    </div>
    <div className="dfooter">
        <div className="pill">{job?.jobcategory}</div>   <div className="pill">Task management</div>   
    </div>
</div>
  )
}

export default Dashboardroles