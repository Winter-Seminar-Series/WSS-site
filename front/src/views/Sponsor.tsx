import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PublicCard from '../components/cards/PublicCard';
import { getModelList, MODEL_LISTS_NAMES } from '../redux/actions/WSS';

const Sponsor = () => {
	return (
		<>
			<section
				className="background-theme"
				style={{ paddingTop: 25 }}
			>
				<div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
					<img src="/images/Tapsell_logo_png.png" alt="Image not found!" style={{ minWidth: 150, width: '40%' }} />
				</div>
				<br />
				<div style={{ minHeight: 300, display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center" }}>
					<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
						<img src="/images/Tapsell_Workspace_2.jpg" alt="Image not found!" className='mx-1 my-2' style={{ minWidth: 300, width: '30%' }} />
						<img src="/images/Tapsell_Workspace_6.jpg" alt="Image not found!" className='mx-1 my-2' style={{ minWidth: 300, width: '30%' }} />
						<img src="/images/Tapsell_Workspace_9.jpg" alt="Image not found!" className='mx-1 my-2' style={{ minWidth: 300, width: '30%' }} />
					</div>
					<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center" }}>
						<img src="/images/Tapsell_Workspace_10.jpg" alt="Image not found!" className='mx-1 my-2' style={{ minWidth: 300, width: '45%' }} />
						<img src="/images/Tapsell_Workspace_12.jpg" alt="Image not found!" className='mx-1 my-2' style={{ minWidth: 300, width: '45%' }} />
					</div>
				</div>
				<div dir='rtl' className='my-3 mx-4' style={{ textAlign: "right", color: "lavender" }}>
					<h4 style={{ color: "lavender", textAlign: "center" }}>
						در تپسل چه می‌کنیم؟
					</h4>
					<br />
					تپسل، محصولِ شرکت پگاه داده‌کاوان شریف، یک شبکه‌ی هوشمند تبلیغات دیجیتال است که در سال 94 کار خود را با ارائه‌ی سرویس تبلیغات ویدئویی درون‌برنامه‌ای، برای اولین بار در ایران، شروع کرد و بعدها دامنه‌ی خدمات خود را به طیف وسیعی از راهکارهای تبلیغات دیجیتال گسترش داد. در حال حاضر تپسل با در اختیار داشتن میلیون‌ها کاربر فعال و طیف گسترده‌ای از رسانه‌های دیجیتال، اعتماد بسیاری از برندهای ایرانی و بین‌المللی را به خود جلب کرده است.
					<br />
					<br />
					فرصت‌های شغلی:
					<br />
					<a href="https://jobs.tapsell.ir">https://jobs.tapsell.ir</a>
				</div>
			</section>
		</>
	);
};

export default Sponsor;
