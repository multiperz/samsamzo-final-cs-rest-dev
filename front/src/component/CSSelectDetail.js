import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, NavLink } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar';

const CSSelectDetail = () => {
	const { csNumber } = useParams();
	const [csDetail, setCsDetail] = useState({});

	const fetchCsDetail = async () => {
		try {
			const response = await axios.get(`/api/cs/select/${csNumber}`);
			setCsDetail(response.data);
		} catch (error) {
			console.error('CS detail 에러:', error);
		}
	};

	useEffect(() => {
		fetchCsDetail();
	}, [csNumber]);

	return (
		<>
			<Navbar variant='light' bg='light' expand='sm'>
				<Container fluid>
					<Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
						<NavLink exact to="/">
							<img
								src="/samsamlogo.png"
								width="80"
								height="80"
								className="d-inline-block align-top"
								alt="Brand logo"
							/>
						</NavLink>
						<div className='main-title' style={{ marginLeft: '10px' }}>
							<h1
								style={{ fontWeight: 'bold', cursor: 'pointer' }}>
								문의 상세 보기
							</h1>
						</div>
					</Navbar.Brand>
				</Container>
			</Navbar>

			<div className='detail-line' style={{ display: 'flex', alignItems: 'center' }}>
				<h2 className='register-detail-text'>상세 내용</h2>
				<div className='cs-detail-btn'>
					<Link to={`/CSUpdate/${csDetail.csNumber}`} state={{ csDetail }} className='btn cs-detail-toupdate'>수정</Link>
					<Link to={`/CSDelete/${csDetail.csNumber}`} className='btn cs-detail-todelete'>삭제</Link>
				</div>
			</div>
			<div className='cs-detail' style={{ display: 'flex', alignItems: 'center' }}>
				<p className='cs-detail-title' style={{ display: 'flex', alignItems: 'center' }}><strong>문의 제목</strong>
					<div className='cs-detail-title-text'>
						{csDetail.csTitle}
					</div>
				</p>
				<p className='cs-detail-date' style={{ display: 'flex', alignItems: 'center' }}><strong>문의 일자</strong>
					<div className='cs-detail-date-text'>
						{csDetail.csDate ? csDetail.csDate.substring(0, 10) : ''}
					</div></p>
			</div>
			<div>
				<p className='cs-detail-content'><strong>문의 내용</strong>
					<div className='cs-detail-content-text'>{csDetail.csContent}</div></p>
			</div>
			<div className='cs-detail-to'>
				<Link to="/" className='btn cs-detail-toselect'>전체 목록</Link>
			</div>
		</>
	);
};

export default CSSelectDetail;
