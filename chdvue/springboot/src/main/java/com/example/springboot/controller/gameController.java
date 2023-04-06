package com.example.springboot.controller;
import com.example.springboot.entity.game;
import com.example.springboot.service.gameService;
import io.swagger.annotations.Api;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@Slf4j
@RequestMapping(value = "/game")
@Api(value = "游戏接口", tags = "游戏相关接口")
public class gameController {
    @Autowired
    private gameService gameS;
    @RequestMapping(value = "/findAll",method = RequestMethod.GET)
    public List<game> findAll(){
        List<game >ga = gameS.findAll();
        return gameS.findAll();
    }
    @RequestMapping(value = "/findByID" ,method = RequestMethod.GET)
    public List<game> findByID(@RequestParam("id") Integer id){
        //System.out.println(id);
        return gameS.findByID(id);
    }
    @PutMapping(value = "/add")
    public void add(@RequestBody game g){
        gameS.add(g);
    }
    @PutMapping(value = "/update")
    public void update(@RequestBody game g){
        gameS.update(g);
    }
    @PutMapping(value = "/updatehot")
    public void updatehot(@RequestBody game g){
        gameS.updatehot(g);
    }

    @DeleteMapping(value = "/delGameByID")
    public void delGameByID(@RequestParam("id") Integer id) {
        //System.out.println("controller begin");
        gameS.delGameByID(id);
        //System.out.println("controller over");
    }
}
