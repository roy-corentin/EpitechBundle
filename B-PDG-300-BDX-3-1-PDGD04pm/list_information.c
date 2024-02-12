/*
** EPITECH PROJECT, 2022
** list
** File description:
** list
*/

#include "include/list.h"

unsigned int list_get_size(list_t list) {
  unsigned int len_list = 0;
  list_t tmp = list;

  while (tmp != NULL) {
    len_list++;
    tmp = tmp->next;
  }

  return len_list;
}

bool list_is_empty(list_t list) { return (list == NULL); }
