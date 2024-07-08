package com.samsam.cs.repository;


import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

//import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.samsam.cs.entity.CI;


public interface CSRepository extends JpaRepository<CI, Integer> {
	Page<CI> findByCsTitleContaining(String searchKeyword, Pageable pageable);
    Page<CI> findByCsContentContaining(String searchContent, Pageable pageable);
}