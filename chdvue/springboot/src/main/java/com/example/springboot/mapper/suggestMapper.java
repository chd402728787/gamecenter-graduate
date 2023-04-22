package com.example.springboot.mapper;

import com.example.springboot.entity.suggest;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
@Mapper
public interface suggestMapper {
    @Select("select * from suggest")
    List<suggest> findAll();
    @Select("select * from suggest where username=#{username}")
    List<suggest> findByName(String username);
    @Insert("insert into suggest (username,nickname,suggestion) values (#{username},#{nickname},#{suggestion})")
    void add(suggest s);
}
