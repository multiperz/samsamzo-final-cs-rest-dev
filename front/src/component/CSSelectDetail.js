import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const CSSelectDetail = () => {
    const { csNumber } = useParams();
    const [csDetail, setCsDetail] = useState({});

    const fetchCsDetail = useCallback(async () => {
        try {
            const response = await axios.get(`/api/cs/select/${csNumber}`);
            setCsDetail(response.data);
        } catch (error) {
            console.error('Error fetching CS detail:', error);
        }
    }, [csNumber]);

    useEffect(() => {
        fetchCsDetail();
    }, [fetchCsDetail]);

    return (
        <div>
            <h1>samsamzo 고객 문의</h1>
            <h2>문의 상세</h2>
            <div>
                <p><strong>문의 제목:</strong> {csDetail.csTitle}</p>
                <p><strong>문의 일자:</strong> {csDetail.csDate ? csDetail.csDate.substring(0, 10) : ''}</p>
                <p><strong>문의 내용:</strong> {csDetail.csContent}</p>
            </div>
            <div>
                <Link to="/">문의 목록</Link>
                <Link to={`/CSUpdate/${csDetail.csNumber}`} state={{ csDetail }}>문의 수정</Link>
                <Link to={`/CSDelete/${csDetail.csNumber}`}>문의 삭제</Link>
            </div>
        </div>
    );
};

export default CSSelectDetail;