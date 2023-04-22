package com.example.springboot.controller;

import com.example.springboot.entity.suggest;
import com.example.springboot.service.suggestService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@RequestMapping(value = "/suggest")
@Api(value = "用户意见接口", tags = "用户意见接口")
public class suggestController {
    @Autowired
    private suggestService sS;
    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public List<suggest> findAll() {
        return sS.findAll();
    }

    @RequestMapping(value = "/findByName", method = RequestMethod.GET)
    public List<suggest> findByName(@RequestParam("username") String username) {
        //System.out.println(id);
        return sS.findByName(username);
    }
    @PutMapping(value = "/add")
    public void add(@RequestBody suggest s){
        sS.add(s);
    }
}