import Productivitybox from '@/components/Productivitybox'
import Link from 'next/link'
import React from 'react'


const myjob = [
  {
    "status": "pending confirmation",
    "is_paidfor": true,
    "joblocation": "Benue",
    "selected_lga": "Gwer West",
    "applicationenddate": "2024-08-11T02:59:27.079028+01:00",
    "applicationpublish": "2024-08-11T02:59:27.079036+01:00",
    "jobpostdate": "2024-08-11T02:59:27.174166+01:00",
    "jobtitle": "Business analyst ",
    "ref": 8706105210,
    "jobservice": "Arts/Crafts",
    "jobcategory": "Arts/Crafts",
    "jobsalaryrange": "Hhus",
    "workinglevel": "6",
    "jobdescription": "<p><br></p><p><strong>Role Overview:</strong></p><p>This role will be instrumental in driving strategic growth and operational efficiency within our dynamic arts &amp; crafts business. You will work closely with leadership, product teams, and key stakeholders to analyze market trends, identify opportunities, and develop innovative solutions that enhance our product offering, customer experience, and overall business performance. </p><p><strong>Key Responsibilities:</strong></p><p><br></p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Market Analysis &amp; Research:</strong></li></ol><p>\n    * Conduct comprehensive market research to identify emerging trends, competitor analysis, and customer insights.\n    * Analyze market data to understand customer needs, preferences, and buying behavior within the arts &amp; crafts industry.\n    * Develop actionable insights and recommendations to inform product development, marketing strategies, and business expansion plans.\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Product &amp; Process Optimization:</strong></li></ol><p>\n    * Analyze existing product lines, identifying opportunities for improvement, expansion, or discontinuation based on market trends and customer feedback.\n    * Evaluate and optimize current business processes to enhance efficiency, reduce costs, and improve customer satisfaction.\n    * Develop and implement data-driven strategies to drive product innovation, improve customer acquisition and retention, and optimize supply chain operations.\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Business Strategy Development &amp; Implementation:</strong></li></ol><p>\n    * Collaborate with leadership to develop and execute strategic plans aligned with the company's long-term vision.\n    * Conduct feasibility studies and financial analysis to evaluate new product launches, business acquisitions, or strategic partnerships.\n    * Develop business cases, financial models, and presentations to support strategic initiatives and secure necessary resources.\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Data Analysis &amp; Reporting:</strong></li></ol><p>\n    * Develop and maintain comprehensive reporting systems to track key performance indicators (KPIs) related to product performance, customer engagement, and financial health.\n    * Analyze data to identify trends, patterns, and anomalies that inform decision-making and strategic direction.\n    * Prepare insightful reports and presentations to communicate findings and recommendations to leadership and stakeholders.\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Project Management:</strong></li></ol><p>\n    * Lead and manage complex projects related to product development, process improvement, and business expansion.\n    * Define project scope, timelines, and deliverables, ensuring projects are completed on time and within budget.\n    * Manage project resources, track progress, and mitigate risks to ensure successful project outcomes.</p><p><br></p><p><strong>Qualifications:</strong></p><p><br></p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>Bachelor's degree in Business Administration, Marketing, Data Analytics, or a related field.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>5+ years of proven experience as a Business Analyst within the Arts &amp; Crafts industry or a similar consumer-facing sector.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>Strong analytical and problem-solving skills with a data-driven approach to decision making.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>Proven ability to conduct comprehensive market research, identify trends, and develop actionable insights.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>Experience with project management methodologies and best practices.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>Excellent communication, presentation, and interpersonal skills to effectively communicate complex information to diverse audiences.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span>Proficient in using data analysis tools, CRM systems, and other relevant software.</li></ol><p><br></p><p><strong>Skills:</strong></p><p><br></p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Data Analytics:</strong> Ability to collect, clean, analyze, and interpret data to identify trends, patterns, and insights.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Market Research:</strong> Expertise in conducting thorough market research, identifying trends, analyzing competitive landscapes, and understanding customer behavior.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Business Strategy:</strong> Understanding of strategic planning, business development, and market positioning.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Financial Analysis:</strong> Ability to evaluate financial data, develop business cases, and conduct feasibility studies.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Project Management:</strong> Proven experience leading and managing complex projects with clear goals, timelines, and deliverables.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Communication &amp; Collaboration:</strong> Excellent written and verbal communication skills, adept at presenting complex information concisely and persuasively.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Problem-Solving:</strong> Ability to identify and analyze problems, develop creative solutions, and implement effective strategies.</li></ol><p>\n</p><ol><li><span class=\"ql-ui\" contenteditable=\"false\"></span><strong>Creativity &amp; Innovation:</strong> Willingness to explore new ideas, think outside the box, and contribute to the development of innovative solutions. </li></ol><p>\n</p><p><br></p>",
    "responsibilities": [
        ""
    ],
    "requirements": [
        ""
    ],
    "organization": {
        "organization_name": "Google",
        "logo": "https://res.cloudinary.com/viktortech/image/upload/v1/media/organizations_images/CompanyGoogle_pfskro"
    },
    "likes": [
        110
    ]
}
]

const Heropage = () => {
  return (
    <div className='hero'>
      <div className="herocontainer">
      <div className="heroflex">
        <div className="heroflexone">
          <div className="herotagline">
            #The world's leading Board Recruitment Platform
          </div>
          <h2 className='landingtitle'>Where Leading Agencies Recruit <span>Pre-verified</span> Board Members</h2>
        <div className="landing-text-sub">
        Our comprehensive hiring platform offers a full-cycle approach to skills-based hiring, integrating skills tests to enhance recruitment efficiency and candidate experience all while leading you to better hires.
        </div>
<div className="ft">
<Link href={'/auth/login'} className="login">
        Start a free trial <span className="material-symbols-outlined">
new_releases
</span>
        </Link>

        <Link href={'/auth/login'} className="login">
        View a live demo <span className="material-symbols-outlined">
play_circle
</span>
        </Link>
</div>
{/* <small className="t-space">
  <span className="material-symbols-outlined">check_circle</span> Quick setup{" "}
  <span className="material-symbols-outlined">check_circle</span> Free 30-day trial{" "}
  <span className="material-symbols-outlined">check_circle</span> No obligation
</small> */}
        </div>
        <div className="heroflextwo">

          <img src="/macbook.png" alt="" />
        </div>
      </div>
      </div>

    </div>
  )
}

export default Heropage