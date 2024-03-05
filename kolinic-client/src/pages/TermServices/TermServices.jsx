import React from 'react';
import { Tabs } from 'antd';
import { FaAngleDoubleRight } from "react-icons/fa";

const data = [
    {
        id: "Overview",
        title: "Overview",
        content: "At our state-of-the-art healthcare center, we prioritize the well-being of our community by providing comprehensive and compassionate medical services. Our dedicated team of skilled healthcare professionals is committed to delivering high-quality care tailored to the individual needs of our patients. Equipped with advanced technology and modern facilities, we offer a wide range of medical services, including preventive care, diagnostics, specialized treatments, and ongoing wellness programs. Our focus is on promoting health, preventing illness, and ensuring that every patient receives personalized attention in a comfortable and supportive environment. With a patient-centric approach and a commitment to excellence, we strive to be your trusted partner in achieving and maintaining optimal health.",
    },
    {
        id: "Data Collection & Use",
        title: "Consent and Information Collection and Use",
        content: <>
            Thank you for choosing our services. By using our platform, you consent to the collection, use, and disclosure of your personal information in accordance with this statement.
            <br />
            <br />
            <ul className='space-y-4'>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>TWe collect both personally identifiable information (PII) and non-personally identifiable information (non-PII) to provide and improve our services</span>
                </li>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>We use your information to personalize your experience, improve our services, communicate with you, and provide relevant updates</span>
                </li>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>We may share your information with trusted third parties, such as service providers and partners, to assist in delivering our services</span>
                </li>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>We take appropriate measures to secure your data from unauthorized access, disclosure, alteration, and destruction</span>
                </li>
            </ul>
            <br />
            By using our services, you acknowledge that you have read and understood this Consent and Information Collection and Use statement. If you have any questions or concerns, please contact us at [contact email/phone].
        </>,
    },
    {
        id: "Cookies Data",
        title: "Cookies and Log Files",
        content: "We use cookies, which are small text files stored on your device, to improve the functionality and performance of our website. These cookies help us understand your preferences, customize content, and analyze site traffic. By using our website, you consent to the use of cookies in accordance with this statement. Like many other websites, we collect information through log files. This includes internet protocol (IP) addresses, browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and clickstream data. This information is used to analyze trends, administer the site, track user movements, and gather demographic information.",
    },
    {
        id: "Data Security",
        title: "Data Security and Retention",
        content: "At Kolinic, we take the security and privacy of your data seriously. This statement outlines our commitment to safeguarding your information and our practices regarding data retention. Your data is used solely for the purposes outlined in our privacy policy. We do not use your information for any purpose incompatible with the original purpose for which it was collected unless we have obtained your consent or as required by law. By using our services, you acknowledge that you have read and understood this statement. If you have any questions or concerns, please contact us at [contact email/phone].",
    },
    {
        id: "Customer Information",
        title: "Information For Customer",
        content: <>
            Welcome to Kolinic ! We appreciate your trust in our services. Below is important information to enhance your experience and ensure clarity regarding our offerings:
            <br />
            <br />
            <ul className='space-y-4'>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>Our customer support team is here to assist you. If you have any questions, concerns, or need help, feel free to reach out to us at kolinic-support@gmail.com. We aim to respond promptly and provide the assistance you require.</span>
                </li>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>Your account with us is crucial for personalized services. Please ensure your account information, including contact details and preferences, is accurate. You can update your information by logging into your account on our website.</span>
                </li>
                <li className='flex items-center gap-[2rem]'>
                    <FaAngleDoubleRight className='text-[--main-color]' />
                    <span>Stay informed about our latest offerings, updates, and promotions. We may send you notifications via email or through our platform. You can manage your communication preferences in your account settings.</span>
                </li>
            </ul>
            <br />
            Thank you for choosing [Your Company Name]. We look forward to serving you and ensuring your experience with us is exceptional. If you have any further inquiries, please do not hesitate to contact us.
            <div className='mt-[20px]'>
                <span className='text-[--main-color] font-bold'>KOLINIC</span> <br />
                Contact Information: <a href="mail:kolinic@gmail.com">kolinic@gmail.com</a> / <a href="tel:+84121390123">+84121390123</a>
            </div>
        </>,
    }
]

function TermServices() {
    return (
        <Tabs
            tabPosition={"left"}
            items={data.map(({ id, title, content }) => ({
                key: id,
                label: <Tab id={id} />,
                children: <Content title={title} content={content} />
            }))}
        />
    )
}

function Tab({ id }) {
    return (
        <div className='w-[100px] sm:w-[200px] md:w-[300px] border-4 border-[--color-grey-100] p-[0.5rem] sm:p-[1.5rem] rounded-xl shadow-lg'>
            <h1 className='text-[--color-grey-500] text-[0.8rem] sm:text--[1.4rem] md:text-[2rem] font-bold text-left'>{id}</h1>
        </div>
    )
}

function Content({ title, content }) {
    return (
        <div className='min-h-[400px] p-[2rem] border-[--color-grey-100] rounded-xl shadow-lg'>
            <h1 className='text-[--color-grey-900] text-[2rem] sm:text-[3rem] md:text-[4rem] font-extrabold'>{title}</h1>
            <p className='text-[--color-grey-500] text-[1rem] sm:text-[1.2rem] md:text-[1.8rem] leading-[1.4rem] sm:leading-[1.8rem] md:leading-[2.5rem] font-normal mt-[1.5rem]'>{content}</p>
        </div>
    )
}

export default TermServices