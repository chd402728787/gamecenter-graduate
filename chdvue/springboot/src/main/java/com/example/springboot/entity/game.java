package com.example.springboot.entity;

import lombok.Data;

@Data
public class game {
    int id;
    String gname;
    String img;
    String gamelink;
    String introduction;
    String date;
    int hotvalue;
}
