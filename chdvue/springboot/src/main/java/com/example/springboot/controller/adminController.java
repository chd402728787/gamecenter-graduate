package com.example.springboot.controller;

import com.example.springboot.entity.user;
import com.example.springboot.service.adminService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/adminuser")
@Api(value = "管理员接口", tags = "管理员接口")
public class adminController {
    @Autowired
    private adminService aurS;
    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public List<user> findAll(){
        List<user>ga = aurS.findAll();
        return aurS.findAll();
    }
    @RequestMapping(value = "/find" ,method = RequestMethod.GET)
    public List<user> find(@RequestParam("username") String username,@RequestParam("password") String password){
        //System.out.println(id);
        return aurS.find(username, password);
    }
    @PutMapping(value = "/add")
    public void add(@RequestBody user g){
        aurS.add(g);
    }
    @PutMapping(value = "/update")
    public void update(@RequestBody user g){
        aurS.update(g);
    }

    @DeleteMapping(value = "/delGuserByID")
    public void delAuserByID(@RequestParam("id") Integer id) {
        //System.out.println("controller begin");
        aurS.delAuserByID(id);
        //System.out.println("controller over");
    }
}
