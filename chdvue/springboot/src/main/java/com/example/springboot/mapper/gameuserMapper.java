package com.example.springboot.mapper;

import com.example.springboot.entity.user;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface gameuserMapper {
    @Select("select * from gameuser")
    List<user> findAll();
    @Select("select * from gameuser where username=#{username} and password=#{password}")
    List<user> find(String username,String password);
    @Select("select * from gameuser where username=#{username}")
    List<user> findByName(String username);
    @Insert("insert into gameuser (username,password) value (#{username},#{password})")
    void add(user u);
    @Update("update gameuser set username=#{username}, password=#{password} where id=#{id}")
    void update(user u);
    @Delete("delete from gameuser where id = #{id}")
    void delGuserByID(Integer id);
}
