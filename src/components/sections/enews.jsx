import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';

const newsData = [
    {
        name: 'Aaj Tak',
        image: 'https://akm-img-a-in.tosshub.com/aajtak/resource/img/aajtak-logo-153X116-v2.png',
        href: 'https://www.aajtak.in/',
    },     
    {
        name: 'ABP News',
        image: 'https://static.abplive.com/frontend/images/ABP_logo_main.svg',
        href: 'https://www.abplive.com/',
    },
    {
        name: 'News18',
        image: 'https://hindi.news18.com/images/siteimages/News18_Hindi_logo_1631086645.svg?impolicy=website&amp;width=130&amp;height=68',
        href: 'https://hindi.news18.com/',
    },
    {
        name: 'Zee News',
        image: 'https://english.cdn.zeenews.com/static/public/zeenews_Hindi_logo3.jpg',
        href: 'https://zeenews.india.com/hindi',
    },
    {
        name: 'Haribhoomi News',
        image: 'https://www.haribhoomi.com/assets/images/logo.png',
        href: 'https://www.haribhoomi.com/',
    },
    {
        name: 'Jagran News',
        image: 'https://www.jagranimages.com/images/newimg/07082022/07_08_2022-jagran_22960944.jpg',
        href: 'https://www.jagran.com/',
    },
    {
        name: 'Bhaskar News',
        image: 'https://pbs.twimg.com/profile_images/1234019064927834113/z7HtdTVd_400x400.png',
        href: 'https://www.bhaskar.com/',
    },
    {
        name: 'Amarujala News',
        image: 'https://play-lh.googleusercontent.com/WqpjMK-CsFvpwq3Z_PX9F80CYRPb3z_0Xws18847jeNK9htDaI4EAYRqpa-VPnCMhxI',
        href: 'https://www.amarujala.com/"',
    },
    {
        name: 'LiveHindustan News',
        image: 'https://www.livehindustan.com/static-content/1y/lh/img/lh-logo-desk.webp',
        href: 'https://www.livehindustan.com/',
    },
    {
        name: 'Navbharattimes News',
        image: 'https://static.langimg.com/thumb/76544596/navbharat-times.jpg?width=256&resizemode=4',
        href: 'https://navbharattimes.indiatimes.com/',
    },
    {
        name: 'Patrika',
        image: 'https://new-img.patrika.com/static-assets/new-patrika-logo.png',
        href: 'https://www.patrika.com/',
    },
    {
        name: 'Jansatta',
        image: 'https://www.jansatta.com/wp-content/themes/ie-network-theme/assets/src/img/logo/jansatta.svg',
        href: 'https://www.jansatta.com/',
    },
    {
        name: 'Punjabkesari',
        image: 'http://static.punjabkesari.in/pk2021/logo-red.png',
        href: 'https://www.punjabkesari.in/',
    },
    {
        name: 'Epaperlokmat',
        image: 'https://epaperlokmat.in/images/newlokmat-samachar.png',
        href: 'http://epaper.lokmat.com/lokmatsamachar/index.php',
    },
    {
        name: 'Prabhatkhabar',
        image: 'https://fea.assettype.com/prabhatkhabar/assets/logo-0fb39d9920bd3756b611.svg',
        href: 'https://www.prabhatkhabar.com/',
    },
    {
        name: 'Khaskhabar',
        image: 'https://www.khaskhabar.com/s3-storage/khaskhabar/images/logo.png',
        href: 'https://www.khaskhabar.com/',
    },
    {
        name: 'Divyahimachal',
        image: 'https://www.divyahimachal.com/wp-content/themes/divyahcms/images/divya-himachal-logo.png',
        href: 'https://www.divyahimachal.com/',
    },
    {
        name: 'Deshdoot',
        image: 'https://images.assettype.com/deshdoot/2020-06/39619422-5b4d-4eab-be53-1879987554fe/Deshdoot_Header_Logo.png',
        href: 'https://www.deshdoot.com/',
    },
    {
        name: 'Dainiktribuneonline',
        image: 'https://www.dainiktribuneonline.com/wp-content/uploads/2023/08/DT-Web-Logo.png',
        href: 'https://www.dainiktribuneonline.com/',
    },
    {
        name: 'Deshbandhu',
        image: 'https://www.deshbandhu.co.in/images/deshbandu_logo.png',
        href: 'http://www.deshbandhu.co.in/',
    },
    {
        name: 'Rashtriyasahara',
        image: 'http://www.rashtriyasahara.com/images/logo2.png',
        href: 'http://www.rashtriyasahara.com/',
    },
    {
        name: 'Webmilap',
        image: 'http://cjss.enewspapr.com/webmilap/includes/images/HindiMilapLogo1.png',
        href: 'http://www.webmilap.com/',
    },   
    {
        name: 'Uttamhindu',
        image: 'https://www.uttamhindu.com/wp-content/uploads/2022/07/06074037/uttam-loog-copy.png',
        href: 'https://www.uttamhindu.com/',
    },
    {
        name: 'Loktej',
        image: 'https://epaper.loktej.com/media-webp/200/2021-10/loktej-white-sm.png',
        href: 'https://www.loktej.com/',
    },

    {
        name: 'Virarjun',
        image: 'http://www.virarjun.com/images/logo.png',
        href: 'http://www.virarjun.com/',
    },
    {
        name: 'Business-standard',
        image: 'https://bsmedia.business-standard.com/wp-content/uploads/2022/09/01185222/bs-hindi-logo.png',
        href: 'https://hindi.business-standard.com/',
    }, 

]

const GridContainer = styled.div`
    @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr)); /* 2 items per row on small screens */
        gap: 1rem;
    }

    @media screen and (min-width: 769px) {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr)); /* 4 items per row on larger screens */
        gap: 1rem;
    }
`;

export default function Enews() {
    return (
        <div className="m-2 rounded-2xl border p-2 ">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight text-center" style={{ marginTop: '0px', marginBottom: '30px' }}>
                E-News
            </h2>
            <div className="grid gap-4 grid-cols-2 md:grid-cols-4  ">
                {newsData.map((news, index) => (
                    <Link
                        className="bg-secondary-foreground/15 p-10  rounded-2xl w-full flex justify-center items-center h-40"
                        target="_blank"
                        to={news.href}
                    >
                        <img src={news.image} alt={news.name} className='mix-blend-darken'></img>
                    </Link>
                ))}
            </div>  
        </div>
    )
}
