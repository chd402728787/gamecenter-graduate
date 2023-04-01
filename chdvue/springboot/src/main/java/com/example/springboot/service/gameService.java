package com.example.springboot.service;

import io.swagger.models.auth.In;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;
import com.example.springboot.entity.game;
import com.example.springboot.mapper.gameMapper;
import java.util.List;
@Service
public class gameService {
    @Resource
    private gameMapper gMapper;
    public List<game> findAll(){
        return gMapper.findAll();
    }
    public List<game> findByID(Integer id){
       return gMapper.findByID(id);
    }
    public void add(game g){
        gMapper.add(g);
    }
    public void update(game g){
        gMapper.update(g);
    }
    public void delGameByID(Integer id){
        gMapper.delGameByID(id);
    }
}
