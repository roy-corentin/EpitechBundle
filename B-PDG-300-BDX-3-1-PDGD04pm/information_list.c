/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/int_list.h"

unsigned int int_list_get_size(int_list_t list) {
  unsigned int len_list = 0;
  int_list_t tmp = list;

  while (tmp != NULL) {
    len_list++;
    tmp = tmp->next;
  }

  return len_list;
}

bool int_list_is_empty(int_list_t list) { return (list == NULL); }
