import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Select,
  Switch,
  Spin,
  Skeleton,
  Popconfirm,
} from "antd";
import {
  LockOutlined,
  LeftOutlined,
  MailOutlined,
  SearchOutlined,
  UndoOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

import "./elements.css";
import history from "../../../utils/historyUtil";
import { isEmpty, isArray } from "../../../utils/commonUtils";

const { Option } = Select;

export const FormItem = (props) => {
  const localRules = props.localRules || [];
  const rules = props.rules || [];
  return (
    <Form.Item
      {...props.formProps}
      initialValue={props.initialValue}
      label={
        props.hideLabel || props.hidden ? null : (
          <span
            style={{
              fontSize: ".725rem",
              fontFamily: "arial",
              color: "#D6D6D8",
            }}
          >
            {props.label}
            {props.required && (
              <span
                style={{
                  color: "red",
                  fontFamily: "monospace",
                  verticalAlign: "3px",
                }}
              >
                *
              </span>
            )}
          </span>
        )
      }
      name={props.name}
      hasFeedback={props.hasFeedback}
      colon={false}
      style={{ marginBottom: 8, ...props.formstyle }}
      rules={[...rules, ...localRules]}
    >
      {props.children}
    </Form.Item>
  );
};

const AntInput = (props) => {
  const handleWhiteSpaceValidation = (rules, value) => {
    if (value && typeof value !== "number") {
      if (value?.split("")?.[0] !== " ") {
        return Promise.resolve();
      } else {
        return Promise.reject(`${props.label} cannot start with space`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const handleNumberValidation = (rules, value) => {
    if (value) {
      if (!isNaN(Number(value))) {
        return Promise.resolve();
      } else {
        return Promise.reject(`${props.label} should be number`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const positiveNumberValidation = (rules, value) => {
    if (value) {
      if (Number(value) >= 0) {
        return Promise.resolve();
      } else {
        return Promise.reject(`${props.label} should be positive`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const emailPattern = {
    pattern: new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$"),
    message: "Please enter in example@email.com format",
  };

  const webPattern = {
    pattern: new RegExp(
      /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(:\d+)?$/i
    ),
    message: "Please enter valid website url.",
  };

  const whiteSpacePattern = {
    validator: handleWhiteSpaceValidation,
  };
  const numberPattern = {
    validator: handleNumberValidation,
  };
  const positive = {
    validator: positiveNumberValidation,
  };

  const pattern =
    props.type === "email"
      ? [emailPattern]
      : props.type === "website"
      ? [webPattern]
      : props.type === "number"
      ? props.allInteger
        ? [whiteSpacePattern, numberPattern]
        : [whiteSpacePattern, numberPattern, positive]
      : [whiteSpacePattern];

  const tempRule = [
    {
      required: props.required,
      message: props.message || `Please enter ${props.label}`,
    },
    ...pattern,
  ];

  const localRules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  return (
    <FormItem localRules={localRules} {...props} hasFeedback>
      <Input
        ref={props.ref}
        autoFocus={props.autoFocus}
        onBlur={props.onBlur}
        onPressEnter={props.onPressEnter}
        placeholder={props.placeholder || `Enter ${props.label}`}
        prefix={
          props.type === "email" ? (
            <MailOutlined
              style={{
                color: "grey",
              }}
            />
          ) : null
        }
      />
    </FormItem>
  );
};

const AntSelect = (props) => {
  const tempRule = [
    {
      required: props.required,
      message: props.message || `Please select ${props.label}`,
    },
  ];

  const localRules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  return (
    <FormItem hasFeedback {...props} localRules={localRules}>
      {
        <Select
          ref={props.ref}
          mode={props.mode}
          showSearch={!props.noSearch}
          onBlur={props.onBlur}
          autoFocus={props.autoFocus}
          onClick={props.onClick}
          disabled={props.disabled}
          onChange={props.onChange}
          onSelect={props.onSelect}
          optionFilterProp="children"
          className={props.className}
          allowClear={!props.noClear}
          notFoundContent={props.waitFor ? <Spin size="small" /> : null}
          dropdownRender={props.dropdownRender}
          placeholder={props.placeholder || `Select ${props.label}`}
          style={{
            color: "black",
            ...props.style,
          }}
          {...props.fieldProps}
        >
          {!isEmpty(props.array)
            ? isArray(props.array) &&
              props.array?.map((item, index) => {
                return (
                  <Option key={index} value={item[props.value]}>
                    {item[props.description]}
                  </Option>
                );
              })
            : props.children}
        </Select>
      }
    </FormItem>
  );
};

export const TextArea = (props) => {
  const handleWhiteSpaceValidation = (rules, value) => {
    if (value) {
      if (value?.split("")?.[0] !== " ") {
        return Promise.resolve();
      } else {
        return Promise.reject(`${props.label} cannot start with space`);
      }
    } else {
      return Promise.resolve();
    }
  };

  const whiteSpacePattern = {
    validator: handleWhiteSpaceValidation,
  };

  const pattern = [whiteSpacePattern];

  const tempRule = [
    {
      required: props.required,
      message: props.message || `Please enter ${props.label}`,
    },
    ...pattern,
  ];

  const localRules =
    props.rules instanceof Array ? [...tempRule, ...props.rules] : tempRule;

  return (
    <FormItem
      {...props}
      localRules={localRules}
      textArea
      overflowHidden
      hasFeedback
    >
      <Input.TextArea
        ref={props.ref}
        onBlur={props.onBlur}
        onPressEnter={props.onPressEnter}
        onClick={props.onClick}
        autoFocus={false}
        autoComplete="off"
        maxLength={props.maxLength}
        onChange={props.onChange}
        disabled={props.disabled || props.viewDetails}
        className={props.className}
        autoSize={{ minRows: props.minRows || 2, maxRows: props.maxRows || 4 }}
        placeholder={props.placeholder || `Enter ${props.label}`}
        style={{
          ...props.style,
        }}
        {...props.fieldProps}
      />
    </FormItem>
  );
};

const AntSwitch = (props) => {
  const [isChecked, setIsChecked] = useState(true);
  const localValue = props.form
    ? props.form.getFieldValue(props.name)
    : props.initialValue;

  const _onChange = (e) => {
    setIsChecked(e);
    props.onChange && props.onChange(e);
  };

  useEffect(() => {
    setIsChecked(props.initialValue);
  }, [props.initialValue]);

  useEffect(() => {
    setIsChecked(localValue);
  }, [localValue]);

  return (
    <FormItem initialValue={props.initialValue} {...props}>
      <Switch
        ref={props.ref}
        onChange={_onChange}
        checked={isChecked}
        size={props.size || "default"}
        form={props.form}
        disabled={props.disabled}
      />
    </FormItem>
  );
};

export const Password = (props) => {
  const lengthValidator = {
    validator: (rules, value) => {
      if (value?.length >= 8) {
        return Promise.resolve();
      } else {
        return Promise.reject(`Should be at least 8 characters long`);
      }
    },
  };

  const upperCaseValidator = {
    pattern: new RegExp("^(?=.*[A-Z]).+$"),
    message: "Should contain a uppercase alphabet",
  };

  const lowerCaseValidator = {
    pattern: new RegExp("^(?=.*[a-z]).+$"),
    message: "Should contain a lowercase alphabet",
  };

  const numberValidor = {
    pattern: new RegExp("^(?=.*[0-9]).+$"),
    message: "Should contain a number",
  };

  const specialChar = {
    pattern: new RegExp("^(?=.*[!@#$%^&*]).+$"),
    message: "Should contain a special character",
  };

  const tempRules = props.rules instanceof Array ? props.rules : [];
  const localrules =
    props.validate && props.required
      ? [
          ...tempRules,
          {
            required: props.required,
            message: props.message || "Please enter your password",
          },
          lowerCaseValidator,
          upperCaseValidator,
          numberValidor,
          specialChar,
          lengthValidator,
        ]
      : props.required
      ? [
          ...tempRules,
          {
            required: props.required,
            message: props.message || "Please enter your password",
          },
        ]
      : tempRules;

  return (
    <FormItem {...props} localrules={localrules} hasFeedback>
      <Input.Password
        ref={props.ref}
        allowClear={props.allowClear}
        onBlur={props.onBlur}
        onPressEnter={props.onPressEnter}
        autoFocus={false}
        onClick={props.onClick}
        onChange={props.onChange}
        className={props.className}
        placeholder={props.placeholder || `Enter ${props.label}`}
        autoComplete="new-password"
        style={{
          color: "#262626",
          height: "32px",

          ...props.style,
        }}
        prefix={<LockOutlined style={{ color: "grey" }} />}
        {...props.fieldProps}
      />
    </FormItem>
  );
};

export const Card = (props) => {
  return (
    <div
      className={` ${props.white ? "card-white" : "card-black"} ${
        props.className
      }`}
      onClick={props.onClick}
      style={props.style}
    >
      <Skeleton loading={props.loading} active>
        {props.to && (
          <div
            onClick={(e) => {
              props.to ? history.push(props.to) : e.preventDefault();
            }}
            className={"back-btn centralize"}
          >
            <LeftOutlined />
          </div>
        )}

        {props.status && (
          <div>
            <AntSwitch
              name={props.statusName || "isActive"}
              style={{ float: "right" }}
              formstyle={{ float: "right" }}
              hideLabel
              initialValue={props.isActive}
              form={props.form}
            />
            <span style={{ float: "right", margin: 5 }}>Active Status:</span>
            <br />
            <br />
          </div>
        )}
        <div>
          {props.children}
          {(props.onSave || props.onCancel) && (
            <>
              {" "}
              <br />
              <Row gutter={[8, 8]}>
                {props.onCancel && (
                  <Col span={12}>
                    <Button
                      style={{ width: "100%" }}
                      className="cancel-btn"
                      onClick={props.onCancel}
                    >
                      Cancel
                    </Button>
                  </Col>
                )}
                {props.onSave && (
                  <Col span={12}>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      onClick={props.onSave}
                    >
                      Save
                    </Button>
                  </Col>
                )}
              </Row>
            </>
          )}
        </div>
      </Skeleton>
    </div>
  );
};

const AntButton = (props) => {
  return (
    <Link to={props.to || "#"} style={{ width: "inherit" }}>
      <FormItem {...props}>
        <Button
          onClick={(e) => {
            // e.preventDefault();
            props.onClick && props.onClick(e);
          }}
          style={{ width: props.width || "100%", ...props.style }}
          className={props.className}
          {...props}
        >
          {props.children}
        </Button>
      </FormItem>
    </Link>
  );
};

export const SearchButton = (props) => {
  return (
    <AntButton
      className={props.isSearch ? "search-btn" : "clear-search-btn"}
      onClick={props.onClick}
    >
      {props.isSearch ? (
        <SearchOutlined style={{ fontWeight: "bold", color: "white" }} />
      ) : (
        <UndoOutlined
          rotate={180}
          style={{ fontWeight: "bold", color: "white" }}
        />
      )}
    </AntButton>
  );
};

export const DeleteButton = (props) => {
  return (
    <Popconfirm title="Sure to delete?" onConfirm={props.onClick}>
      <AntButton
        hideLabel
        formstyle={{ margin: 0 }}
        className="delete-btn"
        style={{ height: 32, width: 32 }}
      >
        <DeleteOutlined style={{ fontWeight: "bold", color: "white" }} />
      </AntButton>
    </Popconfirm>
  );
};

export {
  AntInput as Input,
  AntButton as Button,
  AntSwitch as Switch,
  AntSelect as Select,
};
export default Form;
