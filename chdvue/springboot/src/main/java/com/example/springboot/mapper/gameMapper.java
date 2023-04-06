package com.example.springboot.mapper;

import io.swagger.models.auth.In;
import org.apache.ibatis.annotations.*;
import com.example.springboot.entity.game;

import java.util.List;
@Mapper
public interface gameMapper {
    @Select("select * from game")
    List<game> findAll();
    @Select("select * from game where id=#{id}")
    List<game> findByID(Integer id);
    @Insert("insert into game (gname,img,gamelink,introduction) " +
            "values (#{gname},#{img},#{gamelink},#{introduction})")
    void add(game g);
    @Update("update game " +
            "set gname=#{gname}, img=#{img}, gamelink=#{gamelink},introduction=#{introduction},hotvalue=#{hotvalue} " +
            "where id=#{id}")
    void update(game g);
    @Update("update game set hotvalue=#{hotvalue} where id=#{id}")
    void updatehot(game g);
    @Delete("delete from game where id = #{id}")
    void delGameByID(Integer id);
}
