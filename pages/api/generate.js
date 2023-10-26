import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  //get the jobDescription from the request body
  const jobDescription = req.body.jobDescription || '';
  if (jobDescription.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid jobDescription",
      }
    });
    return;
  }

  //store the personal information of the user
  const personalInformation = `Professional Experience: (We need to have specifics details and numbers for the job)Worked as a Digital
   Marketing Specialist at XYZ Corp (2015-2019) and a Marketing Manager at ABC Ltd (2019-2023) Augmented organic website traffic by 40% through optimizing SEO strategies. 
   Enhanced conversion rates by 25% by revitalizing content marketing efforts, resulting in an increase of 10% in overall sales. Reduced cost per acquisition by 15% through
    meticulous analysis and refinement of paid advertising campaigns. At XYZ Corp, I managed online marketing campaigns; at ABC Ltd, I led the marketing team and strategized the marketing 
    operations. Elevated customer engagement levels by 30% via the implementation of targeted digital marketing strategies. Increased market share by 8% in a competitive landscape,
     attributing to the precise and innovative market positioning strategies. Saved 20% in marketing operational costs by negotiating better terms with vendors and optimizing the 
     allocation of resources for campaigns. Education and Training: MBA in Marketing from Harvard University (2013-2015), BA in Business Administration from the University of 
     California (2009-2013). Major Project: Led a 5-member team to develop a comprehensive business plan in a capstone project, projecting a 20% increase in ROI in a real-world scenario. 
     Internship: Completed an intensive 3-month internship at Alpha Ltd, contributing to a 15% reduction in operational costs through process optimization. Alumni Network: Part 
     of a vibrant 20,000+ alumni network, providing privileged access to a variety of opportunities and resources in the business realm  Studied at Harvard University and the 
     University of California. Research Thesis: Developed an innovative marketing strategy for a tech startup, projecting a 30% increase in market penetration within a year. 
     Strategy Competition: Led a team to win first place in a national strategy competition, showcasing exceptional leadership and analytical skills. Academic Performance: 
     Achieved a GPA of 3.9 Completed Google's Digital Marketing Certification in 2019. Campaign Management: Implemented learned strategies in real-time during the course, 
     contributing to a 25% increase in engagement for a trial campaign. Analytics Proficiency: Mastered the use of Google Analytics, demonstrating the ability to interpret 
     and utilize complex data for strategic decision-making. Peer Recognition: Recognized among the top 5% of peers for innovative and effective digital marketing strategy 
     development and implementation. Skills: Speak English (native) and Spanish (fluent). Proficient in SEO, content creation, and analytics. Skilled in Google Analytics, 
     SEMrush, and Adobe Creative Suite. Achievements and Awards: Awarded 'Marketer of the Year' by XYZ Corp in 2018. Led a campaign that increased user engagement by 30% at 
     ABC Ltd. Career Goals: Seeking a role as a Senior Marketing Manager to leverage my skills in a growth-oriented environment. Aspiring to become a Chief Marketing Officer 
     in a tech-forward company within the next 5 years. Interested in the technology and e-commerce sectors. Additional Experiences: Volunteered for Feed the Children 
     organization, managing their online campaigns. Avid blogger, writing about the latest trends in digital marketing. References: Jane Smith, former supervisor at ABC 
     Ltd, jane.smith@abc.com, +1 (555) 987-6543 LinkedIn: www.linkedin.com/in/abcdef`;


  //store the format of the cover letter
  const coverLetterFormat = `Paragraph 1: Introduction
    "Dear [Company Name], I am [Your Name], a seasoned professional in [your field of expertise], applying for the [Job Title] position. With a rich background in [industry/field], and [X years of experience], I am eager to bring my proven track record of success to your esteemed company."
    
    Paragraph 2: Professional Ambition and Aspiration
    "My career has been driven by a passion for [key element related to the job/industry]. In my previous role at [Previous Company Name], I [description of a key accomplishment, e.g., increased productivity by 20%]. This achievement was not only a testament to my skills and dedication but also fueled my desire to take on more significant challenges and make an impactful contribution."
    
    Paragraph 3: Alignment with the Company and Position
    "Joining [Company Name] represents an exciting opportunity for personal and professional growth. I am particularly drawn to your commitment to [mention a value, project, innovation of the company]. I believe my experience in [key skill/experience] aligns perfectly with your needs for the [Job Title] role, and I am eager to contribute to [specific goal of the company, e.g., enhancing operational efficiency, increasing customer satisfaction]."
    
    Paragraph 4: Conclusion and Call to Action
    "In conclusion, I am eager to bring my [mention a key skill or experience] to [Company Name], actively contributing to [mention a specific area/project/goal]. I am confident that my passion, skills, and dedication would be a valuable addition to your esteemed team. I look forward to discussing in detail how I can contribute to [Company Name]."
    
    Paragraph 5: Appreciation
    "Thank you for considering my application. I am looking forward to the opportunity for an interview to discuss further how my experience, skills, and commitment can contribute to the continued success of [Company Name]. You can reach me at [phone number] or [email address]."
    `;


  //store the requirements of the cover letter
  const coverLetterRequirements = `1. Research and Preparation
    Company and Industry: Conduct an in-depth analysis of the company, its culture, values, and industry.
    Job Role: Understand the job requirements and identify key skills needed.
    2. Customization
    Adaptation: Tailor your letter for each specific company and job role, avoiding generic templates.
    Addressing: Whenever possible, address the letter to a specific individual within the company.
    3. Introduction
    Expression of Interest: Start by expressing your interest and reasoning for wanting to join the company.
    Clarity: Be clear on the specific job role you are applying for.
    4. Body of the Letter
    Experience and Education: Highlight your educational and professional journey, aligning your skills and experiences with job requirements.
    Achievements: Include specific, quantifiable achievements (as in the given example - working for renowned companies, managing complex projects, etc.).
    Skills: Ensure to showcase relevant skills and explain how they add value to the company.
    5. Company Alignment
    Cultural Fit: Emphasize how your values and character align with the company's culture.
    Company Knowledge: Demonstrate that you have researched the company and understand its needs and challenges.
    6. Conclusion
    Reiteration: Reiterate your interest in the role and the company.
    Call to Action: State your availability for an interview and eagerness to discuss further your suitability for the role.`;



  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { "role": "system", "content": "You are a terrible assistant that doesn't do their job." },
        {
          "role": "user", "content": `generate a cover letter for this job description: ${jobDescription}... 
        here is the description of the client: ${personalInformation}... and here is the coverLetterRequirements: ${coverLetterRequirements}... and here is the coverLetterFormat. do not follow the format exactly as it is only a general outline. try to be creative in your coverletter: ${coverLetterFormat}`
        },
      ]
    });
    console.log(response.data.choices[0].message.content);
    // Use response data
    res.status(200).json({ result: response.data.choices[0].message.content });

  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}


