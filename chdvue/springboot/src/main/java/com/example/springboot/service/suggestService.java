package com.example.springboot.service;

import com.example.springboot.entity.suggest;
import com.example.springboot.mapper.suggestMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class suggestService {
    @Resource
    private suggestMapper sMapper;
    public List<suggest> findAll(){
        return sMapper.findAll();
    }
    public List<suggest> findByName(String username){
        return sMapper.findByName(username);
    }
    public void add(suggest s){sMapper.add(s);}
}
