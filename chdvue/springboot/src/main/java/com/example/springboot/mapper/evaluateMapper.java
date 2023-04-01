package com.example.springboot.mapper;

import com.example.springboot.entity.evaluate;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface evaluateMapper {
    @Select("select * from evaluate")
    List<evaluate> findAll();
    @Select("select * from evaluate where id=#{id}")
    List<evaluate> findByID(Integer id);
    @Insert("insert into evaluate (gname,evaluation) " +
            "values (#{gname},#{evaluation})")
    void add(evaluate u);
    @Update("update evaluate set gname=#{gname}, evaluation=#{evaluation} where id=#{id}")
    void update(evaluate u);
    @Delete("delete from evaluate where id = #{id}")
    void delEvaByID(Integer id);
}