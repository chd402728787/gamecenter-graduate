package com.example.springboot.controller;

import com.example.springboot.entity.evaluate;
import com.example.springboot.service.evaluateService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@Slf4j
@RequestMapping(value = "/evaluate")
@Api(value = "用户接口", tags = "用户相关接口")
public class evaluateController {
    @Autowired
    private evaluateService evaS;
    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public List<evaluate> findAll(){
        List<evaluate>ga = evaS.findAll();
        return evaS.findAll();
    }
    @RequestMapping(value = "/findByID" ,method = RequestMethod.GET)
    public List<evaluate> findByID(@RequestParam("id") Integer id){
        //System.out.println(id);
        return evaS.findByID(id);
    }
    @PutMapping(value = "/add")
    public void add(@RequestBody evaluate g){
        evaS.add(g);
    }
    @PutMapping(value = "/update")
    public void update(@RequestBody evaluate g){
        evaS.update(g);
    }

    @DeleteMapping(value = "/delGuserByID")
    public void delEvaByID(@RequestParam("id") Integer id) {
        //System.out.println("controller begin");
        evaS.delEvaByID(id);
        //System.out.println("controller over");
    }
}
