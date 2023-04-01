package com.example.springboot.mapper;

import com.example.springboot.entity.user;
import org.apache.ibatis.annotations.*;

import java.util.List;
@Mapper
public interface adminMapper {
    @Select("select * from adminuser")
    List<user> findAll();
    @Select("select * from adminuser where username=#{username} and password=#{password}")
    List<user> find(String username,String password);
    @Insert("insert into adminuser (username,password) " +
            "values (#{username},#{password})")
    void add(user u);
    @Update("update adminuser set username=#{username}, password=#{password} where id=#{id}")
    void update(user u);
    @Delete("delete from adminuser where id = #{id}")
    void delAuserByID(Integer id);
}
