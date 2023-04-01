package com.example.springboot.service;

import com.example.springboot.entity.user;
import com.example.springboot.mapper.gameuserMapper;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class gameuserService {
    @Resource
    private gameuserMapper gMapper;
    public List<user> findAll(){
        return gMapper.findAll();
    }
    public List<user> find(String username,String password){
        return gMapper.find(username,password);
    }
    public List<user> findByName(String username){
        return gMapper.findByName(username);
    }
    public void add(user u){
        gMapper.add(u);
    }
    public void update(user g){
        gMapper.update(g);
    }
    public void delGuserByID(Integer id){
        gMapper.delGuserByID(id);
    }
}