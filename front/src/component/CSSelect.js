import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { Form, Button, Container, Row, Table, Pagination, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import Navbar from 'react-bootstrap/Navbar';

const CSSelect = () => {
	const [inquiries, setInquiries] = useState([]);
	const [searchContent, setSearchContent] = useState('title');
	const [searchKeyword, setSearchKeyword] = useState('');
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [searchParams, setSearchParams] = useState({ searchContent: '', searchKeyword: '' });
	const [searched, setSearched] = useState(false);
	const [refreshKey, setRefreshKey] = useState(0); // Define refreshKey here
	const [isClicked, setIsClicked] = useState(false); // 클릭할 때 색상 변경

	const handleSearchContentChange = (content) => {
		setSearchContent(content);
	};

	const handleSearchKeywordChange = (e) => {
		setSearchKeyword(e.target.value);
	};

	const handleSearch = (e) => {
		e.preventDefault();
		if (searchKeyword.trim() === '') {
			alert('검색어를 입력하세요.');
			return;
		}
		setPage(1);
		setSearchParams({ searchContent, searchKeyword });
		setSearched(true);
		setRefreshKey(refreshKey + 1); // Update refreshKey to force refresh
	};

	const handlePageChange = (newPage) => {
		setPage(newPage);
		setRefreshKey(refreshKey + 1); // Update refreshKey to force refresh
	};

	const handleReset = () => {
		setSearchContent('title');
		setSearchKeyword('');
		setSearchParams({ searchContent: '', searchKeyword: '' });
		setPage(1);
		setSearched(false);
		setRefreshKey(refreshKey + 1); // Update refreshKey to force refresh
	};

	// 마우스 눌렀을 때
	const handleMouseDown = () => {
		setIsClicked(true);
	};

	// 마우스 뗄 때
	const handleMouseUp = () => {
		setIsClicked(false);
		handleReset();
	};

	const fetchInquiries = useCallback(async () => {
		try {
			const response = await axios.get('/api/cs/select', {
				params: {
					page,
					searchContent: searchParams.searchContent,
					searchKeyword: searchParams.searchKeyword,
				},
			});
			setInquiries(response.data.content);
			setTotalPages(response.data.totalPages);
		} catch (error) {
			console.error('Error fetching inquiries:', error);
		}
	}, [page, searchParams, refreshKey]);

	useEffect(() => {
		fetchInquiries();
	}, [fetchInquiries]);

	const renderPageNumbers = () => {
		const items = [];
		let startPage = Math.floor((page - 1) / 5) * 5 + 1;
		let endPage = Math.min(startPage + 4, totalPages);

		for (let i = startPage; i <= endPage; i++) {
			items.push(
				<Pagination.Item key={i} active={i === page} onClick={() => handlePageChange(i)}>
					{i}
				</Pagination.Item>
			);
		}

		return items;
	};


	return (
		<>
			<Navbar variant="light" bg="light" expand="sm">
				<Container fluid>
					<Navbar.Brand style={{ display: 'flex', alignItems: 'center' }}>
						<NavLink exact to="/">
							<img
								src="/samsamlogo.png"
								width="80"
								height="80"
								className="d-inline-block align-top"
								alt="Brand logo"
								onClick={handleReset}
							/>
						</NavLink>
						<div className='main-title' style={{ marginLeft: '10px' }}>
							<h1
								onClick={handleReset}
								onMouseDown={handleMouseDown}
								onMouseUp={handleMouseUp}
								className={isClicked ? 'clicked' : 'unclicked'}
								style={{ fontWeight: 'bold', cursor: 'pointer' }}>
								고객 문의
							</h1>
						</div>
					</Navbar.Brand>
				</Container>
			</Navbar>
			<Container style={{ marginTop: '20px' }}>
				<section>

					<Row className="align-items-center">
						<div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
							<Dropdown onSelect={handleSearchContentChange} className="mr-2">
								<Dropdown.Toggle className='custom-dropdown' variant="secondary" id="dropdown-basic">
									{searchContent === 'title' ? '제목' : '내용'}
								</Dropdown.Toggle>
								<Dropdown.Menu className='custom-dropdown-menu'>
									<Dropdown.Item eventKey="title">제목</Dropdown.Item>
									<Dropdown.Item eventKey="content">내용</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<Form onSubmit={handleSearch} className="d-flex">
								<Form.Control
									className="search-box mr-2"
									type="text"
									id="searchKeyword"
									placeholder="검색어를 입력하세요"
									value={searchKeyword}
									onChange={handleSearchKeywordChange}
								/>
								<Button className='search-btn' type="submit">검색</Button>
							</Form>
						</div>
					</Row>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<h2 className="register-text">문의 목록</h2>

						<div className='cs-btn'>
							<Link to="/CSInsert" className="btn btn-primary">문의 등록</Link>
						</div>
					</div>

					<Table>
						<thead>
							<tr>
								<th>문의 번호</th>
								<th>문의 제목</th>
								<th>문의 일자</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{inquiries.length > 0 ? (
								inquiries.map((item) => (
									<tr key={item.csNumber}>
										<td>{item.csNumber}</td>
										<td>{item.csTitle}</td>
										<td>{item.csDate ? item.csDate.substring(0, 10) : ''}</td>
										<td>
											<Link to={`/CSSelectDetail/${item.csNumber}`} className="btn btn-info">
												문의 상세 보기
											</Link>
										</td>
									</tr>
								))
							) : (
								<tr>
									<td colSpan="4">검색 결과가 없습니다.</td>
								</tr>
							)}
						</tbody>
					</Table >
					<Pagination className="pagination-controls">
						<Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page <= 1} />
						{renderPageNumbers()}
						<Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page >= totalPages} />
					</Pagination>
					<div className="pagination-actions">
						{searched && (
							<Button className='cs-select-btn' variant="secondary" onClick={handleReset}>전체 목록 보기</Button>
						)}
					</div>
				</section >
			</Container >
		</>
	);
};

export default CSSelect;
