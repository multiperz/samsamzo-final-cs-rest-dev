import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, NavLink, useNavigate } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const CSSelectDetail = () => {
	const { csNumber } = useParams();
	const navigate = useNavigate();
	const [csDetail, setCsDetail] = useState({});

	useEffect(() => {
		const fetchCsDetail = async () => {
			try {
				const response = await axios.get(`/api/cs/select/${csNumber}`);
				setCsDetail(response.data);
			} catch (error) {
				console.error('Error fetching CS detail:', error);
			}
		};

		fetchCsDetail();
	}, [csNumber]);

	const handleDelete = async () => {
		try {
			await axios.delete(`/api/cs/delete/${csNumber}`);
			alert('해당 문의를 삭제했습니다.');
			navigate('/'); // 삭제 성공 시 목록 페이지로 이동
		} catch (error) {
			console.error('Error deleting inquiry:', error);
			alert('문의 삭제에 실패했습니다. 다시 시도해주세요.');
		}
	};

	const handleCancel = () => {
		// Navigate back to inquiry detail page
		navigate(`/CSSelectDetail/${csNumber}`);
	};

	return (
		<div>
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
								문의 삭제
							</h1>
						</div>
					</Navbar.Brand>
				</Container>
			</Navbar>


			<div className='detail-line' style={{ display: 'flex', alignItems: 'center' }}>
				<h2 className='register-detail-text'>상세 내용</h2>
				<div className='cs-delete-btn'>
					<button type="button" onClick={handleCancel} className='cs-delete-canclebtn'>취소</button>
					<button type="button" onClick={handleDelete} className='btn cs-delete'>삭제</button>
				</div>
			</div>
			<div className='cs-detail' style={{ display: 'flex', alignItems: 'center' }}>
				<p className='cs-detail-title' style={{ display: 'flex', alignItems: 'center' }}><strong>문의 제목</strong>
					<div className='cs-detail-title-text'>
						{csDetail.csTitle}
					</div>
				</p>
			</div>
				<div>
					<p className='cs-detail-content'><strong>문의 내용</strong>
						<div className='cs-detail-content-text'>{csDetail.csContent}</div></p>
				</div>
			<div className='cs-detail-to'>
				<Link to="/" className='btn cs-detail-toselect'>전체 목록</Link>
			</div>
		</div>
	);
};

export default CSSelectDetail;