package com.example.springboot.service;

import com.example.springboot.entity.user;
import com.example.springboot.mapper.adminMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class adminService {
    @Resource
    private adminMapper aMapper;
    public List<user> findAll(){
        return aMapper.findAll();
    }
    public List<user> find(String username,String password){
        return aMapper.find(username,password);
    }
    public void add(user g){
        aMapper.add(g);
    }
    public void update(user g){
        aMapper.update(g);
    }
    public void delAuserByID(Integer id){
        aMapper.delAuserByID(id);
    }
}