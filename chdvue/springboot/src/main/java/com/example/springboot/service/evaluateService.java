package com.example.springboot.service;

import com.example.springboot.entity.evaluate;
import com.example.springboot.mapper.evaluateMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class evaluateService {
    @Resource
    private evaluateMapper eMapper;
    public List<evaluate> findAll(){
        return eMapper.findAll();
    }
    public List<evaluate> findByID(Integer id){
        return eMapper.findByID(id);
    }
    public void add(evaluate e){
        eMapper.add(e);
    }
    public void update(evaluate e){
        eMapper.update(e);
    }
    public void delEvaByID(Integer id){
        eMapper.delEvaByID(id);
    }
}