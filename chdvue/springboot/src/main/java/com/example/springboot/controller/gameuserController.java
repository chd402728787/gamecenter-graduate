package com.example.springboot.controller;

import com.example.springboot.entity.user;
import com.example.springboot.service.gameuserService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/gameuser")
@Api(value = "用户接口", tags = "用户相关接口")
public class gameuserController {
    @Autowired
    private gameuserService urS;
    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public List<user> findAll(){
        List<user>ga = urS.findAll();
        return urS.findAll();
    }
    @RequestMapping(value = "/find" ,method = RequestMethod.GET)
    public List<user> find(@RequestParam("username") String username,@RequestParam("password") String password){
        //System.out.println(id);
        return urS.find(username, password);
    }
    @RequestMapping(value = "/findByName" ,method = RequestMethod.GET)
    public List<user> findByName(@RequestParam("username") String username){
        //System.out.println(id);
        return urS.findByName(username);
    }
    @PutMapping(value = "/add")
    public void add(@RequestBody user u){
        urS.add(u);
        System.out.println("添加成功");
    }
    @PutMapping(value = "/update")
    public void update(@RequestBody user g){
        urS.update(g);
    }

    @DeleteMapping(value = "/delGuserByID")
    public void delGuserByID(@RequestParam("id") Integer id) {
        //System.out.println("controller begin");
        urS.delGuserByID(id);
        //System.out.println("controller over");
    }
}
